const matter = require('gray-matter');

/**
 * Parses a course markdown file into structured course data.
 *
 * Structure:
 * ---
 * title: "..."
 * description: "..."
 * level: "Intermediate"
 * duration: "3 hours"
 * language: "en"
 * mandatory: true
 * deadline: "2026-12-31"
 * refresher_months: 12
 * passing_score: 100
 * ---
 *
 * # Module 1: Title
 * ## Lesson 1.1: Title
 * content...
 *
 * ---SLIDES---
 * ## Slide 1
 * **Title:** ...
 * **Content:**
 * content...
 *
 * ---HANDBOOK---
 * ## Chapter 1: Title
 * content...
 *
 * ---QUIZ---
 * **Passing Score:** 100
 * ### Q1
 * **Question:** text?
 * **Options:**
 * A) ...
 * B) ...
 * **Correct:** A
 * **Explanation:** ...
 */
function parseCourseMarkdown(mdText) {
  const { data: frontmatter, content } = matter(mdText);

  const slidesIdx = content.indexOf('\n---SLIDES---');
  const handbookIdx = content.indexOf('\n---HANDBOOK---');
  const quizIdx = content.indexOf('\n---QUIZ---');

  const sectionEnd = (start) => {
    const candidates = [slidesIdx, handbookIdx, quizIdx].filter(i => i > start);
    return candidates.length ? Math.min(...candidates) : content.length;
  };

  const modulesText = slidesIdx !== -1 ? content.slice(0, slidesIdx) :
                      handbookIdx !== -1 ? content.slice(0, handbookIdx) :
                      quizIdx !== -1 ? content.slice(0, quizIdx) : content;

  const getSection = (startIdx) => {
    if (startIdx === -1) return '';
    const from = content.indexOf('\n', startIdx) + 1;
    const to = sectionEnd(startIdx + 1);
    return content.slice(from, to).trim();
  };

  const slidesText = getSection(slidesIdx);
  const handbookText = getSection(handbookIdx);
  const quizText = getSection(quizIdx);

  return {
    info: {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      level: frontmatter.level || 'Intermediate',
      duration: frontmatter.duration || '1 hour',
      language: frontmatter.language || 'en',
      mandatory: frontmatter.mandatory === true || frontmatter.mandatory === 'true',
      deadline: frontmatter.deadline || null,
      refresher_months: parseInt(frontmatter.refresher_months) || 0,
    },
    passing_score: parseInt(frontmatter.passing_score) || 100,
    modules: parseModules(modulesText),
    slides: parseSlides(slidesText),
    handbook: parseHandbook(handbookText),
    quiz: parseQuiz(quizText, frontmatter.passing_score),
  };
}

function parseModules(text) {
  if (!text || !text.trim()) return [];
  const modules = [];
  // Split on H1 headings (# Module N: ...)
  const parts = text.split(/^# /m).filter(s => s.trim());
  parts.forEach(block => {
    const lines = block.split('\n');
    const rawTitle = lines[0].trim();
    const moduleTitle = rawTitle.replace(/^Module\s+\d+[:.]\s*/i, '').trim() || rawTitle;
    const body = lines.slice(1).join('\n');
    const lessons = parseLessons(body);
    if (moduleTitle) {
      modules.push({ title: moduleTitle, description: '', lessons });
    }
  });
  return modules;
}

function parseLessons(text) {
  if (!text || !text.trim()) return [];
  const lessons = [];
  const parts = text.split(/^## /m).filter(s => s.trim());
  parts.forEach(block => {
    const lines = block.split('\n');
    const rawTitle = lines[0].trim();
    const lessonTitle = rawTitle.replace(/^Lesson\s+[\d.]+[:.]\s*/i, '').trim() || rawTitle;
    const content = lines.slice(1).join('\n').trim();
    if (lessonTitle) {
      lessons.push({ title: lessonTitle, content: content || '(Treść lekcji)', duration: 15, video_url: null });
    }
  });
  return lessons;
}

function parseSlides(text) {
  if (!text || !text.trim()) return [];
  const slides = [];
  const parts = text.split(/^## /m).filter(s => s.trim());
  parts.forEach((block, i) => {
    const lines = block.split('\n');
    const slideHeading = lines[0].trim();
    const body = lines.slice(1).join('\n');
    const layout = extractField(body, 'Layout') || 'default';
    const title = extractField(body, 'Title') || slideHeading.replace(/^Slide\s+\d+[:.]\s*/i, '').trim();
    const contentMatch = body.match(/\*\*Content:\*\*\s*\n([\s\S]*?)(?=\n\*\*[A-Z]|\s*$)/);
    const content = contentMatch ? contentMatch[1].trim() : body.replace(/\*\*(?:Layout|Title|Notes):\*\*[^\n]*/g, '').trim();
    const notes = extractField(body, 'Notes') || '';
    slides.push({ title, content: content || title, notes, layout, slide_number: i + 1, order_index: i + 1 });
  });
  return slides;
}

function parseHandbook(text) {
  if (!text || !text.trim()) return [];
  const chapters = [];
  const parts = text.split(/^## /m).filter(s => s.trim());
  parts.forEach((block, i) => {
    const lines = block.split('\n');
    const rawTitle = lines[0].trim();
    const chapterTitle = rawTitle.replace(/^Chapter\s+\d+[:.]\s*/i, '').trim() || rawTitle;
    const content = lines.slice(1).join('\n').trim();
    if (chapterTitle) {
      chapters.push({ title: chapterTitle, content: content || '(Treść rozdziału)', chapter_number: i + 1, order_index: i + 1 });
    }
  });
  return chapters;
}

function parseQuiz(text, defaultScore) {
  const passing_score = parseInt(defaultScore) || 100;
  if (!text || !text.trim()) return { passing_score, questions: [] };

  let effectiveScore = passing_score;
  const psLine = text.match(/\*\*Passing Score:\*\*\s*(\d+)/i);
  if (psLine) effectiveScore = parseInt(psLine[1]) || passing_score;

  const questions = [];
  // Split on ### Q1, ### Q2 etc.
  const parts = text.split(/^### Q\d+/m).filter(s => s.trim());
  parts.forEach(block => {
    const question = extractField(block, 'Question');
    if (!question) return;

    const correctLetter = (extractField(block, 'Correct') || 'A').trim().toUpperCase().charAt(0);
    const explanation = extractField(block, 'Explanation') || '';
    const scenario = extractField(block, 'Scenario') || '';

    // Extract options: lines matching A) B) C) D) or A. B. C. D.
    const optionLines = block.split('\n').filter(l => /^[A-D][).]\s/.test(l.trim()));
    const options = optionLines.map(l => l.replace(/^[A-D][).]\s*/, '').trim());
    const correct_answer = 'ABCD'.indexOf(correctLetter);

    if (options.length >= 2) {
      questions.push({
        question,
        options: JSON.stringify(options),
        correct_answer: correct_answer >= 0 ? correct_answer : 0,
        explanation,
        scenario,
      });
    }
  });

  return { passing_score: effectiveScore, questions };
}

function extractField(text, fieldName) {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

module.exports = { parseCourseMarkdown };

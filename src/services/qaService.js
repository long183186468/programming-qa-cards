import { questionData } from "../data/questionData";

export const loadQAData = async () => {
  try {
    console.log("Loading question data...");
    // 将所有分类的问题合并成一个数组
    const allQuestions = Object.values(questionData).reduce((acc, category) => {
      return acc.concat(category.questions || []);
    }, []);
    
    console.log(`Loaded ${allQuestions.length} questions`);
    return allQuestions;
  } catch (error) {
    console.error("Error loading QA data:", error);
    return [];
  }
};

// 保存进度到 localStorage
export const saveProgress = (completedCards) => {
  try {
    const serializedData = JSON.stringify(Array.from(completedCards));
    localStorage.setItem("qaProgress", serializedData);
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

// 从 localStorage 加载进度
export const loadProgress = () => {
  try {
    const savedData = localStorage.getItem("qaProgress");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return new Set(parsedData);
    }
    return new Set();
  } catch (error) {
    console.error("Error loading progress:", error);
    return new Set();
  }
}; 
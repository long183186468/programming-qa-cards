export const questionCategories = {
  programming: {
    name: "编程学习",
    description: "编程相关的常见问题与解答",
    questions: []
  },
  learning: {
    name: "学习方法",
    description: "学生学习相关的问题与解答",
    questions: []
  }
};

// 问题数据结构示例
export const questionTemplate = {
  id: "unique_id",
  category: "programming", // or "learning"
  question: "问题内容",
  answer: "答案内容",
  tags: ["标签1", "标签2"],
  difficulty: 1, // 1-5表示难度
  createTime: "2024-02-18",
  updateTime: "2024-02-18"
};

// 工具函数：生成唯一ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 工具函数：格式化日期
export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
}; 
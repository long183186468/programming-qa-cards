import json
import time
from datetime import datetime
import os
from docx import Document

def generate_id():
    """生成唯一ID"""
    return f"{int(time.time() * 1000):x}{os.urandom(4).hex()}"

def format_date():
    """格式化当前日期"""
    return datetime.now().strftime("%Y-%m-%d")

def extract_qa_from_docx(file_path, category):
    """从Word文档中提取问答对"""
    doc = Document(file_path)
    questions = []
    current_qa = {"question": "", "answer": ""}
    
    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue
            
        # 假设问题以数字开头，如"1."、"2."等
        if text[0].isdigit() and "." in text[:3]:
            # 如果已经有问题，保存前一个QA对
            if current_qa["question"]:
                questions.append({
                    "id": generate_id(),
                    "category": category,
                    "question": current_qa["question"],
                    "answer": current_qa["answer"].strip(),
                    "tags": [],  # 可以根据内容自动生成标签
                    "difficulty": 1,  # 默认难度
                    "createTime": format_date(),
                    "updateTime": format_date()
                })
                current_qa = {"question": "", "answer": ""}
            
            # 提取新问题
            current_qa["question"] = text.split(".", 1)[1].strip()
        else:
            # 将文本添加到当前答案
            if current_qa["answer"]:
                current_qa["answer"] += "\n" + text
            else:
                current_qa["answer"] = text
    
    # 添加最后一个QA对
    if current_qa["question"]:
        questions.append({
            "id": generate_id(),
            "category": category,
            "question": current_qa["question"],
            "answer": current_qa["answer"].strip(),
            "tags": [],
            "difficulty": 1,
            "createTime": format_date(),
            "updateTime": format_date()
        })
    
    return questions

def main():
    # 创建输出目录
    os.makedirs("src/data", exist_ok=True)
    
    # 处理编程学习问题
    programming_questions = extract_qa_from_docx("编程学习的100个问题.docx", "programming")
    
    # 处理学习方法问题
    learning_questions = extract_qa_from_docx("学生学习相关的100条QA.docx", "learning")
    
    # 创建完整的数据结构
    data = {
        "programming": {
            "name": "编程学习",
            "description": "编程相关的常见问题与解答",
            "questions": programming_questions
        },
        "learning": {
            "name": "学习方法",
            "description": "学生学习相关的问题与解答",
            "questions": learning_questions
        }
    }
    
    # 将数据写入JavaScript文件
    with open("src/data/questionData.js", "w", encoding="utf-8") as f:
        f.write("// 自动生成的问答数据\n")
        f.write("export const questionData = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")

if __name__ == "__main__":
    main()
    print("数据转换完成！") 
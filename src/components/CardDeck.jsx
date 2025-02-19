import { useState, useCallback, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { IoMenuOutline } from "react-icons/io5";
import Card from "./Card";
import { questionData } from "../data/questionData";

const DeckContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.$isMobile ? "10px 5px" : "20px"};
`;

const CategoryContainer = styled.div`
  position: fixed;
  top: ${props => props.$isMobile ? "80px" : "100px"};
  left: ${props => props.$isMobile ? "10px" : "20px"};
  z-index: 1000;
`;

const MenuButton = styled.button`
  background: white;
  border: none;
  border-radius: 24px;
  height: ${props => props.$isMobile ? "40px" : "48px"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: ${props => props.$isMobile ? "0 16px" : "0 20px"};
  gap: 8px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: ${props => props.$isMobile ? "20px" : "24px"};
    color: #1677ff;
  }

  span {
    color: #1677ff;
    font-size: ${props => props.$isMobile ? "14px" : "16px"};
    font-weight: 500;
  }
`;

const CategoryScroll = styled.div`
  position: absolute;
  top: ${props => props.$isMobile ? "50px" : "60px"};
  left: 0;
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: ${props => props.$isOpen ? "grid" : "none"};
  grid-template-columns: 1fr;
  gap: 8px;
  max-height: 70vh;
  overflow-y: auto;
  min-width: ${props => props.$isMobile ? "150px" : "180px"};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #1677ff;
    border-radius: 2px;
  }
`;

const CategoryButton = styled.button`
  padding: ${props => props.$isMobile ? "8px 12px" : "10px 15px"};
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$active ? '#1677ff' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${props => props.$isMobile ? "0.9rem" : "1rem"};
  text-align: left;
  white-space: nowrap;
  width: 100%;

  &:hover {
    background-color: ${props => props.$active ? '#4096ff' : '#f5f5f5'};
  }
`;

const CardSection = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${props => props.$isMobile ? "80px" : "100px"};
  position: relative;
`;

const Controls = styled.div`
  display: flex;
  gap: ${props => props.$isMobile ? "8px" : "16px"};
  position: fixed;
  bottom: ${props => props.$isMobile ? "20px" : "30px"};
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: ${props => props.$isMobile ? "10px" : "15px"};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const Button = styled.button`
  padding: ${props => props.$isMobile ? "6px 12px" : "8px 16px"};
  border: none;
  border-radius: 4px;
  background-color: #1677ff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: ${props => props.$isMobile ? "0.9rem" : "1rem"};
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #4096ff;
  }
`;

const ProgressText = styled.div`
  text-align: center;
  color: #666;
  font-size: ${props => props.$isMobile ? "12px" : "14px"};
  position: fixed;
  bottom: ${props => props.$isMobile ? "5px" : "10px"};
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
  z-index: 100;
`;

const CardDeck = () => {
  const [currentCategory, setCurrentCategory] = useState(Object.keys(questionData)[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resetFlipCounter, setResetFlipCounter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // 点击页面其他区域时关闭菜单
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0);
    setIsMenuOpen(false); // 选择分类后关闭菜单
    setResetFlipCounter(prev => prev + 1); // 重置卡片到问题面
  };

  const handleNextQuestion = useCallback(() => {
    const currentQuestions = questionData[currentCategory].questions;
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const categories = Object.keys(questionData);
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategory(categories[currentCategoryIndex + 1]);
        setCurrentQuestionIndex(0);
      }
    }
    // Increment resetFlipCounter to trigger card reset
    setResetFlipCounter(prev => prev + 1);
  }, [currentCategory, currentQuestionIndex]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      const categories = Object.keys(questionData);
      const currentCategoryIndex = categories.indexOf(currentCategory);
      if (currentCategoryIndex > 0) {
        const prevCategory = categories[currentCategoryIndex - 1];
        setCurrentCategory(prevCategory);
        setCurrentQuestionIndex(questionData[prevCategory].questions.length - 1);
      }
    }
    // Increment resetFlipCounter to trigger card reset
    setResetFlipCounter(prev => prev + 1);
  }, [currentCategory, currentQuestionIndex]);

  const currentQuestion = questionData[currentCategory].questions[currentQuestionIndex];

  return (
    <DeckContainer $isMobile={isMobile}>
      <CategoryContainer $isMobile={isMobile} className="category-menu">
        <MenuButton 
          $isMobile={isMobile}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <IoMenuOutline />
          <span>问题分类</span>
        </MenuButton>
        <CategoryScroll $isMobile={isMobile} $isOpen={isMenuOpen}>
          {Object.keys(questionData).map((category) => (
            <CategoryButton
              key={category}
              $active={currentCategory === category}
              $isMobile={isMobile}
              onClick={() => handleCategoryChange(category)}
            >
              {questionData[category].name}
            </CategoryButton>
          ))}
        </CategoryScroll>
      </CategoryContainer>

      <CardSection $isMobile={isMobile}>
        <Card
          question={currentQuestion.question}
          answer={currentQuestion.answer}
          resetFlip={resetFlipCounter}
          currentProgress={currentQuestionIndex + 1}
          totalQuestions={questionData[currentCategory].questions.length}
        />

        <Controls $isMobile={isMobile}>
          <Button
            $isMobile={isMobile}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0 && currentCategory === Object.keys(questionData)[0]}
          >
            上一个
          </Button>
          <Button
            $isMobile={isMobile}
            onClick={handleNextQuestion}
            disabled={
              currentQuestionIndex === questionData[currentCategory].questions.length - 1 &&
              currentCategory === Object.keys(questionData)[Object.keys(questionData).length - 1]
            }
          >
            下一个
          </Button>
        </Controls>
      </CardSection>
    </DeckContainer>
  );
};

export default CardDeck; 
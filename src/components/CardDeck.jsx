import { useState, useCallback, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
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
  width: 100%;
  max-width: 800px;
  padding: 0 ${props => props.$isMobile ? "5px" : "20px"};
  margin-bottom: ${props => props.$isMobile ? "15px" : "30px"};
`;

const CategoryScroll = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.$isMobile ? "80px" : "100px"}, 1fr));
  gap: ${props => props.$isMobile ? "6px" : "8px"};
  justify-content: center;
  padding: 4px;
`;

const CategoryButton = styled.button`
  padding: ${props => props.$isMobile ? "4px 8px" : "6px 12px"};
  border: none;
  border-radius: 16px;
  background-color: ${props => props.$active ? '#1677ff' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s;
  font-size: ${props => props.$isMobile ? "0.75rem" : "0.85rem"};
  line-height: 1.2;
  text-align: center;
  min-height: ${props => props.$isMobile ? "32px" : "36px"};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.$active ? '#4096ff' : '#e5e5e5'};
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
      <CategoryContainer $isMobile={isMobile}>
        <CategoryScroll $isMobile={isMobile}>
          {Object.keys(questionData).map((category) => (
            <CategoryButton
              key={category}
              $active={currentCategory === category}
              $isMobile={isMobile}
              onClick={() => setCurrentCategory(category)}
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
        />

        <Controls $isMobile={isMobile}>
          <Button
            $isMobile={isMobile}
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            上一个
          </Button>
          <Button
            $isMobile={isMobile}
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questionData[currentCategory].questions.length - 1}
          >
            下一个
          </Button>
        </Controls>

        <ProgressText $isMobile={isMobile}>
          {currentQuestionIndex + 1} / {questionData[currentCategory].questions.length}
        </ProgressText>
      </CardSection>
    </DeckContainer>
  );
};

export default CardDeck; 
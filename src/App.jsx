import { useEffect, useState } from "react";
import styled from "styled-components";
import { SpinLoading } from "antd-mobile";
import { FaGraduationCap } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import CardDeck from "./components/CardDeck";
import { loadQAData, loadProgress, saveProgress } from "./services/qaService";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f6f8ff 0%, #d8e2ff 50%, #e4e9f2 100%);
  padding: ${props => props.$isMobile ? "10px 0" : "20px"};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${props => props.$isMobile ? "16px" : "32px"};
  padding: ${props => props.$isMobile ? "0 16px" : "0 24px"};
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  background: linear-gradient(45deg, #2b6cb0, #4299e1, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  font-size: ${props => props.$isMobile ? "1.8rem" : "2.2rem"};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    font-size: ${props => props.$isMobile ? "1.6rem" : "2rem"};
    color: #4299e1;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const Subtitle = styled.p`
  color: #666;
  margin: 12px 0 0;
  font-size: ${props => props.$isMobile ? "0.95rem" : "1.1rem"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  line-height: 1.5;
  font-weight: 500;

  svg {
    font-size: ${props => props.$isMobile ? "1rem" : "1.2rem"};
    color: #1677ff;
    animation: rotate 2s infinite linear;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(66, 153, 225, 0.15);
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(66, 153, 225, 0.1);
  animation: shimmer 2s infinite linear;

  @keyframes shimmer {
    0% {
      box-shadow: 0 8px 32px rgba(66, 153, 225, 0.15);
    }
    50% {
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.25);
    }
    100% {
      box-shadow: 0 8px 32px rgba(66, 153, 225, 0.15);
    }
  }

  p {
    color: #4a5568;
    font-size: 1.1rem;
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

const App = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedCards, setCompletedCards] = useState(new Set());
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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("Loading QA data...");
        const qaData = await loadQAData();
        console.log("Loaded QA data:", qaData);
        setCards(qaData);
        const savedProgress = loadProgress();
        console.log("Loaded progress:", savedProgress);
        setCompletedCards(savedProgress);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    saveProgress(completedCards);
  }, [completedCards]);

  console.log("Current state:", { loading, cards: cards.length, completedCards });

  if (loading) {
    return (
      <AppContainer $isMobile={isMobile}>
        <LoadingContainer>
          <SpinLoading color="#1677ff" />
          <p>加载问答内容中...</p>
        </LoadingContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer $isMobile={isMobile}>
      <Header $isMobile={isMobile}>
        <Title $isMobile={isMobile}>
          <FaGraduationCap />
          贝朵亚AI编程问答卡片
        </Title>
        <Subtitle $isMobile={isMobile}>
          <BsArrowRepeat />
          滑动或点击按钮切换卡片，点击卡片查看答案
        </Subtitle>
      </Header>
      
      {cards.length > 0 ? (
        <CardDeck
          cards={cards}
          completedCards={completedCards}
          setCompletedCards={setCompletedCards}
        />
      ) : (
        <p>没有找到问答内容</p>
      )}
    </AppContainer>
  );
};

export default App; 
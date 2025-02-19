import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaQuestion, FaLightbulb } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

const CardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: ${props => props.$isMobile ? "400px" : "600px"};
  max-height: ${props => props.$isMobile ? "calc(100vh - 140px)" : "1200px"};
  perspective: 1000px;
  margin: 0 auto;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${props => props.flipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: ${props => props.$isMobile ? "16px" : "20px"};
  background: white;
  box-shadow: 0 8px 32px rgba(22, 119, 255, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(22, 119, 255, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 48px rgba(22, 119, 255, 0.25);
  }
`;

const CardFront = styled(CardSide)`
  transform: rotateY(0deg);
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
`;

const CardTitle = styled.h2`
  position: relative;
  background: linear-gradient(90deg, #1677ff, #4096ff);
  margin: -${props => props.$isMobile ? "20px" : "28px"};
  margin-bottom: ${props => props.$isMobile ? "24px" : "32px"};
  padding: ${props => props.$isMobile ? "32px 24px 16px" : "40px 32px 20px"};
  min-height: ${props => props.$isMobile ? "64px" : "76px"};
  font-size: ${props => props.$isMobile ? "1.4rem" : "1.6rem"};
  font-weight: 700;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 12px;
  letter-spacing: -0.5px;
  color: white;
  border-radius: ${props => props.$isMobile ? "16px 16px 0 0" : "20px 20px 0 0"};
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.2);

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isMobile ? "120px" : "160px"};
    height: 6px;
    background: linear-gradient(90deg, #1677ff, #4096ff);
    border-radius: 3px;
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(22, 119, 255, 0.1);
  }

  svg {
    font-size: ${props => props.$isMobile ? "1.3rem" : "1.5rem"};
    color: white;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
  }
`;

const CardContent = styled.div`
  flex: 1;
  overflow-y: auto;
  font-size: ${props => props.$isMobile ? "1.1rem" : "1.2rem"};
  line-height: 1.8;
  color: #2d3748;
  padding: ${props => props.$isMobile ? "20px 24px" : "24px 32px"};
  margin-top: 10px;
  margin-bottom: ${props => props.$isMobile ? "50px" : "60px"};
  text-align: ${props => props.$isQuestion ? "center" : "left"};
  display: ${props => props.$isQuestion ? "flex" : "block"};
  align-items: ${props => props.$isQuestion ? "center" : "flex-start"};
  justify-content: ${props => props.$isQuestion ? "center" : "flex-start"};

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(22, 119, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #1677ff, #4096ff);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #0958d9, #1677ff);
  }

  /* 段落样式 */
  p {
    margin: 0 0 16px 0;
    text-align: justify;
    letter-spacing: 0.3px;
    color: #4a5568;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
    word-break: break-word;
    white-space: pre-wrap;
  }

  p:last-child {
    margin-bottom: 0;
  }

  /* 列表样式 */
  .list-item {
    display: block;
    margin: 0 0 12px 0;
    padding-left: 2.2em;
    position: relative;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .list-item:last-child {
    margin-bottom: 0;
  }

  .list-item::before {
    content: attr(data-index);
    position: absolute;
    left: 0;
    color: #1677ff;
    font-weight: 600;
  }

  /* 子列表项样式 */
  .sub-list-item {
    padding-left: 1.2em;
    margin: 6px 0;
    position: relative;
    color: #555;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .sub-list-item:last-child {
    margin-bottom: 0;
  }

  .sub-list-item::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #1677ff;
  }
`;

const FlipHint = styled.div`
  position: absolute;
  bottom: ${props => props.$isMobile ? "12px" : "16px"};
  right: ${props => props.$isMobile ? "12px" : "16px"};
  color: #4a5568;
  font-size: ${props => props.$isMobile ? "0.85rem" : "0.95rem"};
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.9;
  font-weight: 500;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.9));
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(22, 119, 255, 0.1);
  transition: all 0.3s ease;
  z-index: 1;
  
  svg {
    color: #1677ff;
    animation: rotate 2s infinite linear;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(22, 119, 255, 0.25);
    transform: translateY(-1px);
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

const Card = ({ question, answer, resetFlip }) => {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardHeight, setCardHeight] = useState(900);
  const answerContentRef = useRef(null);

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
    if (answerContentRef.current) {
      const titleHeight = isMobile ? 48 : 56; // 标题高度（包含margin）
      const padding = isMobile ? 32 : 60; // 上下padding总和
      const minHeight = isMobile ? 400 : 600; // 最小高度改为2倍
      const contentHeight = answerContentRef.current.scrollHeight;
      const totalHeight = titleHeight + padding + contentHeight;
      
      setCardHeight(Math.max(minHeight, totalHeight));
    }
  }, [answer, isMobile]);

  // Reset flip state when resetFlip changes
  useEffect(() => {
    setFlipped(false);
  }, [resetFlip]);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  if (!question || !answer) {
    return <div>Invalid card data</div>;
  }

  // 处理答案中的列表格式和段落
  const formatContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // 处理数字列表项
      if (line.match(/^\d+\)/)) {
        const [, number, content] = line.match(/^(\d+\))\s*(.+)$/);
        return `<div class="list-item" data-index="${number}">${content}</div>`;
      }
      // 处理子列表项（以 - 开头）
      if (line.trim().startsWith('-')) {
        const content = line.trim().substring(1).trim();
        return `<div class="sub-list-item">${content}</div>`;
      }
      // 处理普通段落
      return line.trim() ? `<p>${line.trim()}</p>` : '';
    }).filter(Boolean).join('');
  };

  return (
    <CardContainer $isMobile={isMobile} $height={cardHeight} onClick={handleClick}>
      <CardInner flipped={flipped}>
        <CardFront $isMobile={isMobile}>
          <CardTitle $isMobile={isMobile}>
            <FaQuestion />
            问题
          </CardTitle>
          <CardContent $isMobile={isMobile} $isQuestion={true}>{question}</CardContent>
          <FlipHint $isMobile={isMobile}>
            <IoMdRefresh /> 点击查看答案
          </FlipHint>
        </CardFront>
        <CardBack $isMobile={isMobile}>
          <CardTitle $isMobile={isMobile}>
            <FaLightbulb />
            答案
          </CardTitle>
          <CardContent 
            ref={answerContentRef}
            $isMobile={isMobile}
            $isQuestion={false}
            dangerouslySetInnerHTML={{ __html: formatContent(answer) }}
          />
          <FlipHint $isMobile={isMobile}>
            <IoMdRefresh /> 点击返回问题
          </FlipHint>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default Card; 
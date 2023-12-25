import styled from "styled-components";


export const AnimateContainer = styled.div`
  @keyframes morphing {
    0% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      box-shadow: 15px 15px 50px rgba(0,0,0,0.2);
    }
    25% { 
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
      box-shadow: -10px -5px 50px rgba(0,0,0,0.2);
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%	;	
    }
  }

  @keyframes skewAnimation {
    0% {
      transform: skew(0deg, 0deg);
    }
    50% {
      transform: skew(20deg, 20deg);
    }
    100% {
      transform: skew(0deg, 0deg);
    }
  }

  @keyframes translateAnimation {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(50px, 50px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes rotateAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes scaleAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  width: 300px;
  height: 300px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(25%);

  &::before {
    content: '';
    background-color: var(--primary-color);
    border: 2px solid var(--pink-color);
    position: absolute;
    width: 130%;
    height: 130%;
    opacity: 0.3;
    border-radius: 50%;
    animation: morphing 10s infinite linear alternate;
  }

  img:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    animation: scaleAnimation 10s infinite linear alternate;
  }

  img:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 0;
    animation: skewAnimation 10s infinite linear alternate;
  }

  img:nth-child(3) {
    position: absolute;
    top: 100%;
    left: 0;
    animation: rotateAnimation 10s infinite linear alternate;
  }
  
  img:nth-child(4) {
    position: absolute;
    top: 0%;
    right: 0;
    animation: translateAnimation 10s infinite linear alternate;
  }

  img:nth-child(5) {
    opacity: 0.8;
  }
`
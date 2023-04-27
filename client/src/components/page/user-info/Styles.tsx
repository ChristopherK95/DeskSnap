import styled from 'styled-components';
import useColor from '../../../reusable/hooks/use-color';

export const Window = styled.div`
  position: relative;
  background-color: ${useColor('darkGray')};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 50px;
`;

export const Container = styled.div`
  border-radius: 10px;
  background-color: ${useColor('gray')};
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1000px;
  width: 100%;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.6);
`;

export const HR = styled.hr`
  width: 100%;
  margin: 0;
`;

export const Label = styled.div`
  opacity: 0.6;
  flex: 1.5 1;
  text-align: start;
`;

export const Value = styled.div`
  width: 100%;
  text-align: start;
  flex: 4 1;
  display: flex;
  flex-direction: column;
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex: 1 1;
`;

export const Category = styled.div`
  font-size: 22px;
  display: flex;
  gap: 15px;
  width: 100%;
  padding: 25px 0;
`;

export const Password = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  opacity: 0.6;
`;

export const ChangePassword = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  padding: 25px;
  display: flex;
  font-size: 26px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
`;

export const Delete = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: flex-start;
  max-width: 1000px;
`;

export const DeleteContainer = styled.div`
  width: 400px;
  height: 200px;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
`;

export const DeleteTitle = styled.div`
  padding: 0 20px;
  display: flex;
`;

export const DeleteText = styled.div`
  display: flex;
  padding: 0 20px;
`;

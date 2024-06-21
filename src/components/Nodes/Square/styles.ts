import { Background } from "reactflow";

export const squareStyles = (size: { width: number, height: number }, selected: boolean) => ({
    width: size.width, 
    height: size.height, 
    minWidth: 100, 
    minHeight: 100,
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    Background: 'bg-violet-500',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '10px',
    wordWrap: 'break-word',
  });
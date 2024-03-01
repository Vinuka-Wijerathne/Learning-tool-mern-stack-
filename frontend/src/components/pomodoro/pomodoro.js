import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import "./pomodoro.css"

const red = '#f4e4e';
const green = '#4aec8c';

const Pomodoro = () => {
  const rotation = 0; // Set an appropriate value for rotation
  const strokeLinecap = 'butt'; // Set an appropriate value for strokeLinecap

  return (
    <div className='pomodoro'>
      <CircularProgressbar
        value={60}
        text={'60%'}
        styles={buildStyles({
          rotation,
          strokeLinecap,
          textColor: '#fff',
          pathColor: red,
          tailColor: 'rgba(255,255,255,.2)',
        })}
      />
      <div>
        {/* Additional content */}
      </div>
      <PlayButton />
    </div>
  );
};

export default Pomodoro;

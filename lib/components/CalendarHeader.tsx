import sharedClasses from '../shared.module.css';
import classes from './CalendarHeader.module.css';

interface Props {
  text?: string;
  onTextClick?: () => void;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  style?: object;
}

export default function CalendarHeader({
  text,
  onTextClick,
  onLeftClick,
  onRightClick,
  style,
}: Props) {
  return (
    <div className={classes.header} style={style}>
      <button
        data-testid="calendar-header-left-button"
        disabled={!onLeftClick}
        className={`${sharedClasses.btn} ${classes.btn}`}
        onClick={onLeftClick}
      >
        &lt;
      </button>
      <div onClick={onTextClick}>{text}</div>
      <button
        data-testid="calendar-header-right-button"
        disabled={!onRightClick}
        className={`${sharedClasses.btn} ${classes.btn}`}
        onClick={onRightClick}
      >
        &gt;
      </button>
    </div>
  );
}

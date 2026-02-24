'use client';

import { memo, useMemo, Fragment } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface CharScatter {
  char: string;
  inX: number;
  inY: number;
  inRot: number;
  outX: number;
  outY: number;
  outRot: number;
  delay: number;
}

const ScatterChar = memo(({ data, progress, assembleRange, disperseRange }: {
  data: CharScatter;
  progress: MotionValue<number>;
  assembleRange: [number, number];
  disperseRange: [number, number];
}) => {
  const aS = assembleRange[0] + data.delay;
  const aE = assembleRange[1] + data.delay;
  const dS = disperseRange[0] + data.delay;
  const dE = disperseRange[1] + data.delay;

  const x = useTransform(progress, [aS, aE, dS, dE], [data.inX, 0, 0, data.outX]);
  const y = useTransform(progress, [aS, aE, dS, dE], [data.inY, 0, 0, data.outY]);
  const rotate = useTransform(progress, [aS, aE, dS, dE], [data.inRot, 0, 0, data.outRot]);
  const opacity = useTransform(progress, [aS, aS + 0.04, dE - 0.04, dE], [0, 1, 1, 0]);

  return (
    <motion.span style={{ x, y, rotate, opacity, display: 'inline-block' }}>
      {data.char}
    </motion.span>
  );
});

ScatterChar.displayName = 'ScatterChar';

interface ScatterTextProps {
  text: string;
  progress: MotionValue<number>;
  assembleRange: [number, number];
  disperseRange: [number, number];
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
}

const ScatterText = ({
  text,
  progress,
  assembleRange,
  disperseRange,
  className,
  style,
  stagger = 0.0015,
}: ScatterTextProps) => {
  const words = useMemo(() => {
    let globalIdx = 0;
    return text.split(' ').map((word) => {
      const chars = word.split('').map((char): CharScatter => {
        const inAngle = Math.random() * Math.PI * 2;
        const outAngle = Math.random() * Math.PI * 2;
        const inDist = 500 + Math.random() * 900;
        const outDist = 500 + Math.random() * 900;
        const c: CharScatter = {
          char,
          inX: Math.cos(inAngle) * inDist,
          inY: Math.sin(inAngle) * inDist,
          inRot: (Math.random() - 0.5) * 120,
          outX: Math.cos(outAngle) * outDist,
          outY: Math.sin(outAngle) * outDist,
          outRot: (Math.random() - 0.5) * 120,
          delay: globalIdx * stagger,
        };
        globalIdx++;
        return c;
      });
      globalIdx++; // count the space
      return chars;
    });
  }, [text, stagger]);

  return (
    <span className={className} style={style}>
      {words.map((wordChars, wi) => (
        <Fragment key={wi}>
          {wi > 0 && ' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordChars.map((c, ci) => (
              <ScatterChar
                key={ci}
                data={c}
                progress={progress}
                assembleRange={assembleRange}
                disperseRange={disperseRange}
              />
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
};

export default ScatterText;

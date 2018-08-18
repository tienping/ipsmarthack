import styled from 'styled-components/native';

export const Row = styled.View`
    display: flex;
    flexDirection: row;
    flexWrap: wrap;
    justifyContent: center;
`;

const Col = styled.View`
    position: relative;
    minHeight: 1px;
    paddingRight: 5px;
    paddingLeft: 5px;
`;

// col{number}/12 = column; (bootstrap style)
export const Col1 = Col.extend`
    flexBasis: 8.333333%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 8.333333%;
`;

export const Col2 = Col.extend`
    flexBasis: 16.666667%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 16.666667%;
`;

export const Col3 = Col.extend`
    flexBasis: 25%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 25%;
`;

export const Col4 = Col.extend`
    flexBasis: 33.333333%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 33.333333%;
`;

export const Col5 = Col.extend`
    flexBasis: 41.666667%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 41.666667%;
`;

export const Col6 = Col.extend`
    flexBasis: 50%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 50%;
`;

export const Col7 = Col.extend`
    flexBasis: 58.333333%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 58.333333%;
`;

export const Col8 = Col.extend`
    flexBasis: 66.666667%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 66.666667%;
`;

export const Col9 = Col.extend`
    flexBasis: 75%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 75%;
`;

export const Col10 = Col.extend`
    flexBasis: 83.333333%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 83.333333%;
`;

export const Col11 = Col.extend`
    flexBasis: 91.666667%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 91.666667%;
`;

export const Col12 = Col.extend`
    flexBasis: 100%;
    flexGrow: 0;
    flexShrink: 0;
    maxWidth: 100%;
`;

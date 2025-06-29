const CARD_HEIGHT = 400;
const IMAGE_HEIGHT = 180;
const CONTENT_HEIGHT = 120;

const cardStyles = {
  card: {
    borderRadius: 14,
    boxShadow: '0 4px 16px rgba(44,62,80,0.10)',
    height: CARD_HEIGHT,
    minWidth: 260,
    maxWidth: 360,
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    border: 'none',
    overflow: 'hidden',
    transition: 'transform 0.14s, box-shadow 0.14s',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.025)',
      boxShadow: '0 8px 32px rgba(44,62,80,0.16)',
    },
  },
  media: {
    width: '100%',
    height: IMAGE_HEIGHT,
    objectFit: 'cover',
    background: '#f8fafc',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    display: 'block',
  },
  content: {
    flex: 1,
    minHeight: CONTENT_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 3,
    background: 'transparent',
  },
  title: {
    fontFamily: 'Playfair Display, serif',
    fontWeight: 700,
    color: '#222',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1.2rem',
    mb: 1,
  },
  desc: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    color: '#6e6e6e',
    fontSize: '1.05rem',
    mb: 1,
    minHeight: 44,
    maxHeight: 44,
  },
  price: {
    mt: 1,
    fontWeight: 700,
    color: '#ff7043',
    fontSize: '1.12rem',
  },
  icon: {
    mt: 1,
    alignSelf: 'flex-end',
    color: '#ff7043',
    fontSize: 30,
  },
  button: {
    mt: 2,
    borderRadius: 8,
    fontWeight: 600,
    letterSpacing: 1,
    fontSize: 16,
    background: 'linear-gradient(90deg, #ffb347 0%, #ffcc33 100%)',
    color: '#2d3142',
    boxShadow: '0 2px 8px rgba(220,0,78,0.08)',
    '&:hover': {
      background: 'linear-gradient(90deg, #ffcc33 0%, #ffb347 100%)',
      color: '#ff7043',
    },
  },
};

export default cardStyles; 
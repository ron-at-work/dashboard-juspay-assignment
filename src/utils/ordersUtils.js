/**
 * Utility functions for Orders page
 */



// Avatar mapping for users
export const getAvatarSvg = (userName) => {
  const avatarMap = {
    'Natali Craig': 'woman',
    'Kate Morrison': 'woman-two',
    'Drew Cano': 'man',
    'Orlando Diggs': 'man-two',
    'Andi Lane': 'woman',
    'Sarah Johnson': 'woman-two',
    'Michael Brown': 'man',
    'Emily Davis': 'woman',
    'David Wilson': 'man-two',
    'Lisa Anderson': 'woman-two',
    'Robert Taylor': 'man',
    'Jennifer Martinez': 'woman',
    'Christopher Lee': 'man-two',
    'Amanda Garcia': 'woman-two',
    'Matthew Rodriguez': 'man',
    'Ashley White': 'woman',
    'Daniel Thompson': 'man-two',
    'Jessica Clark': 'woman-two',
    'Andrew Lewis': 'man',
    'Stephanie Walker': 'woman',
    'Kevin Hall': 'man-two',
    'Nicole Allen': 'woman-two',
    'Ryan Young': 'man',
    'Michelle King': 'woman',
    'Brandon Wright': 'man-two',
    'Rachel Lopez': 'woman-two',
    'Tyler Hill': 'man',
    'Samantha Scott': 'woman',
    'Justin Green': 'man-two',
    'Lauren Adams': 'woman-two',
    'Nathan Baker': 'man',
    'Megan Nelson': 'woman',
    'Jacob Carter': 'man-two',
    'Brittany Mitchell': 'woman-two',
    'Zachary Perez': 'man',
    'Kayla Roberts': 'woman',
    'Caleb Turner': 'man-two',
    'Hannah Phillips': 'woman-two',
    'Ethan Campbell': 'man',
    'Olivia Parker': 'woman',
    'Noah Evans': 'man-two',
    'Ava Edwards': 'woman-two',
    'Liam Collins': 'man',
    'Sophia Stewart': 'woman',
    'Mason Sanchez': 'man-two',
    'Isabella Morris': 'woman-two',
    'William Rogers': 'man',
    'Mia Reed': 'woman',
    'James Cook': 'man-two',
    'Charlotte Bailey': 'woman-two'
  };
  return avatarMap[userName] || 'user';
};

// Common color mapping function
const getColorMapping = (theme = 'light') => ({
  purple: '#8A8CD9',
  green: '#4AA785',
  blue: '#59A8D4',
  orange: '#FFC555',
  gray: theme === 'dark' ? '#FFFFFF66' : '#1C1C1C66'
});

// Status color mapping
export const getStatusColor = (statusColor, theme = 'light') => {
  const colors = getColorMapping(theme);
  return colors[statusColor];
};

// Status text color mapping (same as background color for consistency)
export const getStatusTextColor = (statusColor, theme = 'light') => {
  // eslint-disable-next-line sonarjs/no-identical-functions
  return getStatusColor(statusColor, theme);
};

// Field mapping for sorting
export const getFieldMap = () => ({
  'Order ID': 'orderId',
  'User': 'user',
  'Project': 'project',
  'Address': 'address',
  'Date': 'date',
  'Status': 'status'
});

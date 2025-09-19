import * as ordersUtils from '../../src/utils/ordersUtils';

describe('ordersUtils', () => {
  describe('getAvatarSvg', () => {
    it('should return correct avatar for known users', () => {
      expect(ordersUtils.getAvatarSvg('Natali Craig')).toBe('woman');
      expect(ordersUtils.getAvatarSvg('Kate Morrison')).toBe('woman-two');
      expect(ordersUtils.getAvatarSvg('Drew Cano')).toBe('man');
      expect(ordersUtils.getAvatarSvg('Orlando Diggs')).toBe('man-two');
      expect(ordersUtils.getAvatarSvg('Andi Lane')).toBe('woman');
      expect(ordersUtils.getAvatarSvg('Sarah Johnson')).toBe('woman-two');
      expect(ordersUtils.getAvatarSvg('Michael Brown')).toBe('man');
      expect(ordersUtils.getAvatarSvg('Emily Davis')).toBe('woman');
      expect(ordersUtils.getAvatarSvg('David Wilson')).toBe('man-two');
      expect(ordersUtils.getAvatarSvg('Lisa Anderson')).toBe('woman-two');
    });

    it('should return default avatar for unknown users', () => {
      expect(ordersUtils.getAvatarSvg('Unknown User')).toBe('user');
      expect(ordersUtils.getAvatarSvg('John Doe')).toBe('user');
      expect(ordersUtils.getAvatarSvg('')).toBe('user');
    });

    it('should handle null and undefined inputs', () => {
      expect(ordersUtils.getAvatarSvg(null)).toBe('user');
      expect(ordersUtils.getAvatarSvg(undefined)).toBe('user');
    });

    it('should handle case sensitivity', () => {
      expect(ordersUtils.getAvatarSvg('natali craig')).toBe('user');
      expect(ordersUtils.getAvatarSvg('NATALI CRAIG')).toBe('user');
      expect(ordersUtils.getAvatarSvg('Natali Craig')).toBe('woman');
    });

    it('should return correct avatars for all mapped users', () => {
      const testCases = [
        { name: 'Natali Craig', expected: 'woman' },
        { name: 'Kate Morrison', expected: 'woman-two' },
        { name: 'Drew Cano', expected: 'man' },
        { name: 'Orlando Diggs', expected: 'man-two' },
        { name: 'Andi Lane', expected: 'woman' },
        { name: 'Sarah Johnson', expected: 'woman-two' },
        { name: 'Michael Brown', expected: 'man' },
        { name: 'Emily Davis', expected: 'woman' },
        { name: 'David Wilson', expected: 'man-two' },
        { name: 'Lisa Anderson', expected: 'woman-two' },
        { name: 'Robert Taylor', expected: 'man' },
        { name: 'Jennifer Martinez', expected: 'woman' },
        { name: 'Christopher Lee', expected: 'man-two' },
        { name: 'Amanda Garcia', expected: 'woman-two' },
        { name: 'Matthew Rodriguez', expected: 'man' },
        { name: 'Ashley White', expected: 'woman' },
        { name: 'Daniel Thompson', expected: 'man-two' },
        { name: 'Jessica Clark', expected: 'woman-two' },
        { name: 'Andrew Lewis', expected: 'man' },
        { name: 'Stephanie Walker', expected: 'woman' },
        { name: 'Kevin Hall', expected: 'man-two' },
        { name: 'Nicole Allen', expected: 'woman-two' },
        { name: 'Ryan Young', expected: 'man' },
        { name: 'Michelle King', expected: 'woman' },
        { name: 'Brandon Wright', expected: 'man-two' },
        { name: 'Rachel Lopez', expected: 'woman-two' },
        { name: 'Tyler Hill', expected: 'man' },
        { name: 'Samantha Scott', expected: 'woman' },
        { name: 'Justin Green', expected: 'man-two' },
        { name: 'Lauren Adams', expected: 'woman-two' },
        { name: 'Nathan Baker', expected: 'man' },
        { name: 'Megan Nelson', expected: 'woman' },
        { name: 'Jacob Carter', expected: 'man-two' },
        { name: 'Brittany Mitchell', expected: 'woman-two' },
        { name: 'Zachary Perez', expected: 'man' },
        { name: 'Kayla Roberts', expected: 'woman' },
        { name: 'Caleb Turner', expected: 'man-two' },
        { name: 'Hannah Phillips', expected: 'woman-two' },
        { name: 'Ethan Campbell', expected: 'man' },
        { name: 'Olivia Parker', expected: 'woman' },
        { name: 'Noah Evans', expected: 'man-two' },
        { name: 'Ava Edwards', expected: 'woman-two' },
        { name: 'Liam Collins', expected: 'man' },
        { name: 'Sophia Stewart', expected: 'woman' },
        { name: 'Mason Sanchez', expected: 'man-two' },
        { name: 'Isabella Morris', expected: 'woman-two' },
        { name: 'William Rogers', expected: 'man' },
        { name: 'Mia Reed', expected: 'woman' },
        { name: 'James Cook', expected: 'man-two' },
        { name: 'Charlotte Bailey', expected: 'woman-two' }
      ];

      testCases.forEach(({ name, expected }) => {
        expect(ordersUtils.getAvatarSvg(name)).toBe(expected);
      });
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for light theme', () => {
      expect(ordersUtils.getStatusColor('purple', 'light')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusColor('green', 'light')).toBe('#4AA785');
      expect(ordersUtils.getStatusColor('blue', 'light')).toBe('#59A8D4');
      expect(ordersUtils.getStatusColor('orange', 'light')).toBe('#FFC555');
      expect(ordersUtils.getStatusColor('gray', 'light')).toBe('#1C1C1C66');
    });

    it('should return correct colors for dark theme', () => {
      expect(ordersUtils.getStatusColor('purple', 'dark')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusColor('green', 'dark')).toBe('#4AA785');
      expect(ordersUtils.getStatusColor('blue', 'dark')).toBe('#59A8D4');
      expect(ordersUtils.getStatusColor('orange', 'dark')).toBe('#FFC555');
      expect(ordersUtils.getStatusColor('gray', 'dark')).toBe('#FFFFFF66');
    });

    it('should default to light theme when theme is not provided', () => {
      expect(ordersUtils.getStatusColor('purple')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusColor('gray')).toBe('#1C1C1C66');
    });

    it('should handle unknown status colors', () => {
      expect(ordersUtils.getStatusColor('unknown')).toBeUndefined();
      expect(ordersUtils.getStatusColor('red')).toBeUndefined();
      expect(ordersUtils.getStatusColor('yellow')).toBeUndefined();
    });

    it('should handle null and undefined inputs', () => {
      expect(ordersUtils.getStatusColor(null)).toBeUndefined();
      expect(ordersUtils.getStatusColor(undefined)).toBeUndefined();
    });

    it('should handle different theme values', () => {
      expect(ordersUtils.getStatusColor('gray', 'dark')).toBe('#FFFFFF66');
      expect(ordersUtils.getStatusColor('gray', 'light')).toBe('#1C1C1C66');
      expect(ordersUtils.getStatusColor('gray', 'unknown')).toBe('#1C1C1C66'); // defaults to light
    });
  });

  describe('getStatusTextColor', () => {
    it('should return same colors as getStatusColor for light theme', () => {
      expect(ordersUtils.getStatusTextColor('purple', 'light')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusTextColor('green', 'light')).toBe('#4AA785');
      expect(ordersUtils.getStatusTextColor('blue', 'light')).toBe('#59A8D4');
      expect(ordersUtils.getStatusTextColor('orange', 'light')).toBe('#FFC555');
      expect(ordersUtils.getStatusTextColor('gray', 'light')).toBe('#1C1C1C66');
    });

    it('should return same colors as getStatusColor for dark theme', () => {
      expect(ordersUtils.getStatusTextColor('purple', 'dark')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusTextColor('green', 'dark')).toBe('#4AA785');
      expect(ordersUtils.getStatusTextColor('blue', 'dark')).toBe('#59A8D4');
      expect(ordersUtils.getStatusTextColor('orange', 'dark')).toBe('#FFC555');
      expect(ordersUtils.getStatusTextColor('gray', 'dark')).toBe('#FFFFFF66');
    });

    it('should default to light theme when theme is not provided', () => {
      expect(ordersUtils.getStatusTextColor('purple')).toBe('#8A8CD9');
      expect(ordersUtils.getStatusTextColor('gray')).toBe('#1C1C1C66');
    });

    it('should handle unknown status colors', () => {
      expect(ordersUtils.getStatusTextColor('unknown')).toBeUndefined();
      expect(ordersUtils.getStatusTextColor('red')).toBeUndefined();
    });

    it('should handle null and undefined inputs', () => {
      expect(ordersUtils.getStatusTextColor(null)).toBeUndefined();
      expect(ordersUtils.getStatusTextColor(undefined)).toBeUndefined();
    });

    it('should be identical to getStatusColor for all inputs', () => {
      const testCases = [
        { statusColor: 'purple', theme: 'light' },
        { statusColor: 'green', theme: 'dark' },
        { statusColor: 'blue', theme: 'light' },
        { statusColor: 'orange', theme: 'dark' },
        { statusColor: 'gray', theme: 'light' },
        { statusColor: 'gray', theme: 'dark' },
        { statusColor: 'purple' }, // no theme
        { statusColor: 'unknown' },
        { statusColor: null },
        { statusColor: undefined }
      ];

      testCases.forEach(({ statusColor, theme }) => {
        const statusColorResult = ordersUtils.getStatusColor(statusColor, theme);
        const textColorResult = ordersUtils.getStatusTextColor(statusColor, theme);
        expect(textColorResult).toBe(statusColorResult);
      });
    });
  });

  describe('getFieldMap', () => {
    it('should return correct field mapping', () => {
      const fieldMap = ordersUtils.getFieldMap();
      
      expect(fieldMap).toEqual({
        'Order ID': 'orderId',
        'User': 'user',
        'Project': 'project',
        'Address': 'address',
        'Date': 'date',
        'Status': 'status'
      });
    });

    it('should return the same object on multiple calls', () => {
      const fieldMap1 = ordersUtils.getFieldMap();
      const fieldMap2 = ordersUtils.getFieldMap();
      
      expect(fieldMap1).toStrictEqual(fieldMap2); // Same content
    });

    it('should have all expected field mappings', () => {
      const fieldMap = ordersUtils.getFieldMap();
      
      expect(fieldMap['Order ID']).toBe('orderId');
      expect(fieldMap['User']).toBe('user');
      expect(fieldMap['Project']).toBe('project');
      expect(fieldMap['Address']).toBe('address');
      expect(fieldMap['Date']).toBe('date');
      expect(fieldMap['Status']).toBe('status');
    });

    it('should not have unexpected field mappings', () => {
      const fieldMap = ordersUtils.getFieldMap();
      const expectedKeys = ['Order ID', 'User', 'Project', 'Address', 'Date', 'Status'];
      
      expect(Object.keys(fieldMap)).toEqual(expectedKeys);
    });
  });
});

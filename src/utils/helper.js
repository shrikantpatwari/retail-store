const generateUUID = function generateUUID() {
  const timestamp = new Date().getTime().toString(16);
  return `${'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })}-${timestamp}`;
};

module.exports = generateUUID;

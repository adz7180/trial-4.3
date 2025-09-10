// Handles anti-abuse trial tracking
export default {
  getAbuseLog() {
    return [
      { deviceId: 'ABCD1234', ip: '192.168.1.7', attempts: 4 },
      { deviceId: 'XYZ99999', ip: '192.168.1.5', attempts: 2 }
    ]
  }
}

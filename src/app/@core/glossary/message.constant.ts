export class MessageConstant {
  static MSG_LOGIN_FAIL: String = 'Sai tài khoản/ mật khẩu, vui lòng đăng nhập lại.';
  static MSG_WARNING_CHANGE_NOT_SAVE: string = 'Các thay đổi chưa được lưu. Click lại icon X để thoát.';
  static MSG_SAVE_SUCCESSFUL: string = 'Hệ thống đã lưu lại các thông tin của bạn!';
  static MSG_INVALID_EMAIL: string = 'Email không hợp lệ, vui lòng nhập lại!';
  static MSG_ACCOUNT_PASSWORD_BLANK: string = 'Vui lòng nhập tài khoản/mật khẩu';
  static MSG_ERROR = {
    SYSTEM_ERROR: 'Lỗi không xác định, vui lòng liên hệ quản trị viên',
    USER_NOTFOUND_ERROR: 'Không tìm thấy người dùng',
  };
  static MSG_SUCCESS = {
    UPDATE_SUCCESS: 'Đã cập nhật thành công',
    CREATE_SUCCESS: 'Đã tạo thành công',
  };
  constructor() {
  }
}

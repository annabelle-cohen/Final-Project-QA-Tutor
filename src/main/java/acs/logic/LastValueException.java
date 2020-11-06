package acs.logic;

public class LastValueException extends RuntimeException {

	
	 

		private static final long serialVersionUID = 1L;

		private String errCode;
		private String errMsg;

		
		public LastValueException(String errMsg) {
			this.errMsg = errMsg;
		}

		public String getErrCode() {
			return errCode;
		}

		public void setErrCode(String errCode) {
			this.errCode = errCode;
		}

		public String getErrMsg() {
			return errMsg;
		}

		public void setErrMsg(String errMsg) {
			this.errMsg = errMsg;
		}


}

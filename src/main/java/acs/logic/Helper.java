package acs.logic;

public class Helper {
	public static boolean isValidEmail(String email) {
		String emailFormat = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		return email.matches(emailFormat);
	}

	public static boolean isValidAvatar(String avatar) {
		if (avatar != null && !avatar.equals(""))
			return true;
		else
			return false;
	}
	
	public static boolean isDefined (String str ) {
		
		return str!=null && !str.isEmpty();
	}
}

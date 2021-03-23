package acs.logic;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

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

	public static boolean isDefined(String str) {

		return str != null && !str.isEmpty();
	}

	public static int getRandomNumberUsingNextInt(int min, int max) {
		Random random = new Random();
		return random.nextInt(max - min) + min;
	}

	public static Date between(Date startInclusive, Date endExclusive) {
		long startMillis = startInclusive.getTime();
		long endMillis = endExclusive.getTime();
		long randomMillisSinceEpoch = ThreadLocalRandom.current().nextLong(startMillis, endMillis);

		return new Date(randomMillisSinceEpoch);
	}

}

package acs.logic;

import java.util.List;

import acs.boundaries.PersonalInfoBoundary;
import acs.boundaries.UserBoundary;

public interface UserService {

	public UserBoundary login(String email);

	public UserBoundary createUser(UserBoundary input);

	public PersonalInfoBoundary updateUserDetails(String email, PersonalInfoBoundary input);

	public List<UserBoundary> exportAllUsers(String email);

	public void deleteAllUseres(String adminEmail);

}

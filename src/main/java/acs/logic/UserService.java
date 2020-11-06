package acs.logic;

import java.util.List;

import acs.boundaries.UserBoundary;

public interface UserService {

	public UserBoundary login(String email);

	public UserBoundary createUser(UserBoundary input);

	public UserBoundary updateUserDetails(String email, UserBoundary input);

	public List<UserBoundary> exportAllUsers(String email);

	public void deleteAllUseres(String adminEmail);

}

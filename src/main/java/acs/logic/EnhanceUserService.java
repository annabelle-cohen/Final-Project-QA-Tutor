package acs.logic;

import java.util.List;

import acs.boundaries.UserBoundary;

public interface EnhanceUserService extends UserService {

	List<UserBoundary> exportAllUsers(String email, int size, int page);

}

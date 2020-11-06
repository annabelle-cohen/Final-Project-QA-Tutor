package acs.logic;

import java.util.ArrayList;
import acs.boundaries.ActionBoundary;
import acs.boundaries.UserBoundary;


//need to delete never use!
public interface AdminService {

	public ArrayList<UserBoundary> exportAllUsers(String email);

	public ArrayList<ActionBoundary> exportAllActions(String email);

	public void deleteAllUseres(String adminEmail);

	public void deleteAllElements(String adminEmail);

	public void deleteAllActions(String adminEmail);

}

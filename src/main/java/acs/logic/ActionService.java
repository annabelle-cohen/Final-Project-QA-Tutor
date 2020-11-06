package acs.logic;

import java.util.List;

import acs.boundaries.ActionBoundary;

public interface ActionService {

	public Object invokeAction(ActionBoundary input);

	public void deleteAllActions(String adminEmail);

	public List<ActionBoundary> getAllActions(String email);

}

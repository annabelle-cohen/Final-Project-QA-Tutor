package acs.logic;

import java.util.List;

import acs.boundaries.ActionBoundary;

public interface EnhanceActionService extends ActionService {

	List<ActionBoundary> ExportAllActions(String email, int size, int page);

}

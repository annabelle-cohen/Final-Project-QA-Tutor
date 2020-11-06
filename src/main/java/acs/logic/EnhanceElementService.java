package acs.logic;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import acs.boundaries.ElementBoundary;

public interface EnhanceElementService extends ElementService {

	public void addChildrenToElement(String email, String parentElementId, String elementId);
	public Set<ElementBoundary> getElementChildren(String email, String parentElementId);
	public Collection<ElementBoundary> getElementParents(String email, String childrenElementId);
	public Collection<ElementBoundary> getAll(String email, int size, int page);
	public List<ElementBoundary> getElementChildren(String email, String parentElementId, int size, int page);
	public List<ElementBoundary> getElementParents(String email, String childrenElementId, int size, int page);
	public List<ElementBoundary> getElementsByName(String email, String name, int size, int page);
	public List<ElementBoundary> getElementsByType(String email, String type, int size, int page);
	
	

}

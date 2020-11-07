//package acs.logic;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional;
//import java.util.Set;
//import java.util.stream.Collectors;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort.Direction;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import acs.data.ElementEntity;
//import acs.data.UserEntity;
//import acs.data.UserRole;
//import acs.data.CreatedBy;
//import acs.data.ElementConverter;
//import acs.boundaries.ElementBoundary;
//import acs.dal.ElementDao;
//
//import acs.dal.LastValueDao;
//import acs.dal.UserDao;
//
//@Service
//public class ElementServiceWithDB implements EnhanceElementService {
//	private ElementDao elementDao;
//	private ElementConverter entityConverter;
//	private LastValueDao lastValueDao;
//	private UserDao usersDao;
//	private static final String SEQ_KEY = "element";
//
//	@Autowired
//	public ElementServiceWithDB(ElementDao elementDao, UserDao usersDao, LastValueDao lastValueDao) {
//		this.elementDao = elementDao;
//		this.lastValueDao = lastValueDao;
//		this.usersDao = usersDao;
//	}
//
//	@Autowired
//	public void setEntityConverter(ElementConverter entityConverter) {
//		this.entityConverter = entityConverter;
//	}
//
//	@Override
//	@Transactional
//	public ElementBoundary create(String managerEmail, ElementBoundary element) {
//		Optional<UserEntity> userEntity = this.usersDao.findById(managerEmail);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (!userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			throw new UserNotFoundException("The user is not a Manager!");
//		}
//		if (managerEmail == null) {
//			throw new UserNotFoundException("managerEmail cannot be null !");
//		}
//		if (!isValidEmail(managerEmail)) {
//			throw new IllegalArgumentException("invalid email addres");
//		}
//		if (!isValidEmail(element.getCreatedby().getEmail())) {
//			throw new IllegalArgumentException("invalid email addres");
//		}
//		if (element.getName() == null) {
//			throw new UserNotFoundException("element name cannot be null !");
//		}
//
//		if (element.getType() == null) {
//			throw new UserNotFoundException("element type cannot be null !");
//		}
//
//	
//		Long id = this.lastValueDao.getNextSequenceId(SEQ_KEY);
//		element.setCreatedTimestamp(new Date());
//		element.setElementId(String.valueOf(id));
//		
//
//		ElementEntity entity = this.entityConverter.toEntity(element);
//		CreatedBy createdby = new CreatedBy();
//		createdby.setEmail(managerEmail);
//		entity.setCreatedby(createdby);
//		entity = this.elementDao.save(entity);
//
//		return this.entityConverter.convertFromEntity(entity);
//	}
//
//	@Override
//	@Transactional
//	public ElementBoundary update(String managerEmail, String elementId, ElementBoundary update) {
//
//		ElementBoundary existing = this.getSpecificElement(managerEmail, elementId);
//
//		Optional<UserEntity> userEntity = this.usersDao.findById(managerEmail);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (!userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			throw new UserNotFoundException("The user is not a Manager !");
//		}
//		if (existing == null) {
//			throw new ElementNotFoundException("could not find element for id: " + elementId);
//		}
//
//		if (update.getType() != null) {
//			existing.setType(update.getType());
//		}
//		if (update.getName() != null) {
//			existing.setName(update.getName());
//		}
//
//		if (update.getLocation() != null) {
//			existing.setLocation(update.getLocation());
//		}
//
//		if (update.getElementAttributes() != null) {
//			existing.setElementAttributes(update.getElementAttributes());
//		}
//
//		if (update.isActive() != existing.isActive()) {
//			existing.setActive(update.isActive());
//		}
//
//		this.elementDao.save(this.entityConverter.toEntity(existing));
//
//		return existing;
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getAll(String userEmail) {
//
//		List<ElementBoundary> rv = new ArrayList<>();
//		Iterable<ElementEntity> elements = this.elementDao.findAll();
//		Optional<UserEntity> userEntity = this.usersDao.findById(userEmail);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			for (ElementEntity e : elements) {
//				rv.add(this.entityConverter.convertFromEntity(e));
//
//			}
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.PLAYER)
//				|| userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
//			for (ElementEntity e : elements) {
//				if (e.isActive() == true) {
//					rv.add(this.entityConverter.convertFromEntity(e));
//				}
//			}
//		}
//
//		return rv;
//
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public ElementBoundary getSpecificElement(String userEmail, String elementId) {
//
//		if (userEmail != null) {
//			Optional<ElementEntity> entity = this.elementDao.findById(Long.parseLong(elementId));
//
//			if (entity.isPresent()) {
//
//				Optional<UserEntity> userEntity = this.usersDao.findById(userEmail);
//				if (!userEntity.isPresent()) {
//					throw new UserNotFoundException("User was not found!");
//				}
//
//				if (userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//					return this.entityConverter.convertFromEntity(entity.get());
//
//				} else if ((userEntity.get().getRoleEnum().equals(UserRole.PLAYER)) && (entity.get().isActive())) {
//					return this.entityConverter.convertFromEntity(entity.get());
//
//				} else
//					throw new ElementNotFoundException("Element not found: " + elementId);
//
//			} else {
//				throw new ElementNotFoundException("could not find element for id: " + elementId);
//			}
//		} else
//			throw new ElementNotFoundException("user email cannot be null!");
//	}
//
//	@Override
//	@Transactional
//	public void deleteAllElements(String adminEmail) {
//
//		Optional<UserEntity> userEntity = this.usersDao.findById(adminEmail);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (!userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
//			throw new UserNotFoundException("The user is not an Admin!");
//		}
//
//		this.elementDao.deleteAll();
//	}
//
//	@Override
//	@Transactional
//	public void addChildrenToElement(String email, String parentElementId, String elementId) {
//		Optional<UserEntity> userEntity = this.usersDao.findById(email);
//		
//		if(userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//
//		if (parentElementId != null && parentElementId.equals(elementId)) {
//			throw new RuntimeException("element cannot add itself as a child");
//		}
//
//		ElementEntity origin = this.elementDao.findById(this.entityConverter.toEntityId(parentElementId))
//				.orElseThrow(() -> new ElementNotFoundException("could not find element for id: " + parentElementId));
//
//		ElementEntity elementChild = this.elementDao.findById(this.entityConverter.toEntityId(elementId))
//				.orElseThrow(() -> new ElementNotFoundException("could not find element for id: " + elementId));
//
//		origin.addChild(elementChild);
//
//		this.elementDao.save(origin);
//		this.elementDao.save(elementChild);
//		
//		}else {
//			throw new ElementNotFoundException("Can not add children to user that his role isn't MANAGER");
//		}
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public Set<ElementBoundary> getElementChildren(String email, String parentElementId) {
//		ElementEntity origin = this.elementDao.findById(this.entityConverter.toEntityId(parentElementId))
//				.orElseThrow(() -> new ElementNotFoundException("could not find element for id: " + parentElementId));
//
//		return origin.getChildren().stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toSet());
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public Collection<ElementBoundary> getElementParents(String email, String childrenElementId) {
//		ElementEntity child = this.elementDao.findById(this.entityConverter.toEntityId(childrenElementId))
//				.orElseThrow(() -> new ElementNotFoundException("could not find element for id: " + childrenElementId));
//
//		Set<ElementEntity> parents = child.getParents();
//		Set<ElementBoundary> set = new HashSet<>();
//
//		for (ElementEntity parent : parents) {
//			set.add(this.entityConverter.convertFromEntity(parent));
//		}
//
//		return set;
//	}
//
//	static boolean isValidEmail(String email) {
//		String emailFormat = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
//		return email.matches(emailFormat);
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getAll(String email, int size, int page) {
//		List<ElementBoundary> rv = new ArrayList<>();
//		List<ElementBoundary> elements = new ArrayList(); //this.elementDao.findAll(PageRequest.of(page, size, Direction.ASC, "elementId"))
//			//	.getContent().stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
//		Optional<UserEntity> userEntity = this.usersDao.findById(email);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			for (ElementBoundary e : elements) {
//				rv.add(e);
//
//			}
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.PLAYER)
//				|| userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
//			for (ElementBoundary e : elements) {
//				if (e.isActive() == true) {
//					rv.add(e);
//				}
//			}
//		}
//
//		return rv;
//
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getElementChildren(String email, String parentElementId, int size, int page) {
//		return this.elementDao
//				.findAllByParentsElementId(this.entityConverter.toEntityId(parentElementId),
//						PageRequest.of(page, size, Direction.ASC, "elementId"))
//				.stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
//
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getElementParents(String email, String childrenElementId, int size, int page) {
//
//		return this.elementDao
//				.findAllByChildrenElementId(this.entityConverter.toEntityId(childrenElementId),
//						PageRequest.of(page, size, Direction.ASC, "elementId"))
//				.stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
//
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getElementsByName(String email, String name, int size, int page) {
//		List<ElementBoundary> rv = new ArrayList<>();
//		List<ElementBoundary> elements = this.elementDao
//				.findAllByNameLike(name, PageRequest.of(page, size, Direction.ASC, "elementId")).stream()
//				.map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
//		Optional<UserEntity> userEntity = this.usersDao.findById(email);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			for (ElementBoundary e : elements) {
//				rv.add(e);
//
//			}
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.PLAYER)
//				|| userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
//			for (ElementBoundary e : elements) {
//				if (e.isActive() == true) {
//					rv.add(e);
//				}
//			}
//		}
//
//		return rv;
//	}
//
//	@Override
//	@Transactional(readOnly = true)
//	public List<ElementBoundary> getElementsByType(String email, String type, int size, int page) {
//		List<ElementBoundary> rv = new ArrayList<>();
//		List<ElementBoundary> elements = this.elementDao
//				.findAllByTypeLike(type, PageRequest.of(page, size, Direction.ASC, "elementId")).stream()
//				.map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
//		Optional<UserEntity> userEntity = this.usersDao.findById(email);
//
//		if (!userEntity.isPresent()) {
//			throw new UserNotFoundException("User was not found!");
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.MANAGER)) {
//			for (ElementBoundary e : elements) {
//				rv.add(e);
//
//			}
//		}
//
//		if (userEntity.get().getRoleEnum().equals(UserRole.PLAYER)
//				|| userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
//			for (ElementBoundary e : elements) {
//				if (e.isActive() == true) {
//					rv.add(e);
//				}
//			}
//		}
//
//		return rv;
//	}
//
//}

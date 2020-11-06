package acs.logic;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import java.util.LinkedHashMap;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import acs.boundaries.ActionBoundary;
import acs.boundaries.ElementBoundary;

import acs.dal.ActionsDao;
import acs.dal.ElementDao;

import acs.boundaries.UserBoundary;
import acs.dal.ActionsDao;
import acs.dal.ElementDao;
import acs.dal.LastValueDao;
import acs.dal.UserDao;
import acs.data.ActionConverter;
import acs.data.ActionEntity;
import acs.data.ElementConverter;
import acs.data.ElementEntity;

import acs.data.UserEntity;
import acs.data.UserRole;

import acs.data.ActionType;
import acs.data.CreatedBy;
import acs.data.ElementConverter;
import acs.data.ElementEntity;
import acs.data.Location;
import acs.data.UserEntity;
import acs.data.UserRole;

@Service
public class ActionServiceWithDB implements EnhanceActionService {

	private ActionsDao actionDao;
	private ActionConverter actionEntityConverter;
	private ElementConverter elementConverter;
	private LastValueDao lastValueDao;
	private UserDao usersDao;
	private ElementDao elementDao;
	
	@Autowired
	private ElementServiceWithDB elementServiceWithDB;
	@Autowired
	private UserServiceWithDB userServiceWithDB;

	private static final String SEQ_KEY = "Action";

	@Autowired
	public ActionServiceWithDB(ActionsDao actionDao,ElementDao elementDao, UserDao usersDao,LastValueDao lastValueDao) {
		this.actionDao = actionDao;
		this.lastValueDao = lastValueDao;
		this.elementDao = elementDao;
		this.usersDao = usersDao;
	}

	@Autowired
	public void setActionConverter(ActionConverter entityConverter) {
		this.actionEntityConverter = entityConverter;
		
	}

	@Autowired
	public void setElementConverter(ElementConverter elementConverter) {
		this.elementConverter = elementConverter;

	}

	@Override
	@Transactional
	public ActionBoundary invokeAction(ActionBoundary action) {
		if (action.getType() != null) {

			String email = action.getInvokedBy().getEmail();
			UserBoundary user = this.userServiceWithDB.login(email);

			if (!user.getRoleEnum().equals(UserRole.PLAYER)) {
				throw new UserNotFoundException("User is not a player!");
			}

			String elementID = action.getElement().getElementId();
			ElementBoundary element = this.elementServiceWithDB.getSpecificElement(email, elementID);

			action.setCreatedTimestamp(new Date());

			action.setActionId(String.valueOf(lastValueDao.getNextSequenceId(SEQ_KEY)));

			ActionEntity actionEntity = this.actionEntityConverter.toEntity(action);

			List<ElementEntity> searchList = new ArrayList<>();

			boolean searchFunc = false;

			try {
			ActionType type = ActionType.valueOf(action.getType());

			switch (type) {
			case CREATE_COURT:
				createCourt(user, element, actionEntity, action);
				// createGame(userEntity,elementEntity,actionEntity);
				break;
			case CREATE_GAME:
				createGame(user, element, actionEntity, action);
				break;
			/*
			 * case "Join to Exist Game": action =
			 * joinToExistGame(userEntity,eBoundary,action); break; case
			 * "Check For Closing Court": searchList =
			 * searchCourt(userEntity,eBoundary,action); searchFunc=true; break; case
			 * "Exit From Game": action = exitGame(userEntity,eBoundary,action); break;
			 */
			case JOIN_GAME:
				joinGame(user, element, actionEntity, action);
				break;
			case LEAVE_GAME:
				 leaveGame(user, element, actionEntity, action);
				break;
			default:
				break;
			}
		}
			catch (Exception e ) {
				actionEntity = this.actionDao.save(actionEntity);
				return this.actionEntityConverter.convertFromEntity(actionEntity);
			}
		
		actionEntity = this.actionDao.save(actionEntity);

			return this.actionEntityConverter.convertFromEntity(actionEntity);
		} else
			throw new ActionNotFoundException("The type is null");

	}


	@Override
	@Transactional(readOnly = true)
	public List<ActionBoundary> getAllActions(String email) {
		List<ActionBoundary> rv = new ArrayList<>();
		Iterable<ActionEntity> allActions = this.actionDao.findAll();
		for (ActionEntity action : allActions) {
			rv.add(this.actionEntityConverter.convertFromEntity(action));
		}
		return rv;
	}

	@Override
	@Transactional
	public void deleteAllActions(String adminEmail) {
		Optional<UserEntity> userEntity = this.usersDao.findById(adminEmail);

		if (!userEntity.isPresent()) {
			throw new UserNotFoundException("User was not found!");
		}
		
		if (!userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
			throw new UserNotFoundException("The user is doesn't have premssion to invoke this functionality!");
		}
		this.actionDao.deleteAll();

	}

	@Override
	@Transactional(readOnly = true)
	public List<ActionBoundary> ExportAllActions(String email, int size, int page) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		

		if (!userEntity.isPresent()) {
			throw new UserNotFoundException("User was not found!");
		}
		
		if (!userEntity.get().getRoleEnum().equals(UserRole.ADMIN)) {
			throw new UserNotFoundException("The user is doesn't have premssion to invoke this functionality!");
		}
		return this.actionDao.findAll(PageRequest.of(page, size, Direction.ASC, "actionId")).getContent()
				.stream().map(this.actionEntityConverter::convertFromEntity).collect(Collectors.toList());
	}

	@SuppressWarnings("rawtypes")
	private ActionEntity createGame(UserBoundary user, ElementBoundary court, ActionEntity action,
			ActionBoundary actionBoundary) {

		ElementBoundary game = new ElementBoundary();
		game.setActive(true);
		game.setType("GAME");
		game.setElementAttributes(actionBoundary.getActionAttributes());
		Location l = new Location();
		LinkedHashMap l1 = (LinkedHashMap) actionBoundary.getActionAttributes().get("location");
		Double lat = (Double) l1.get("lat");
		Double lng = (Double) l1.get("lng");
		l.setLat(lat);
		l.setLng(lng);
		game.setLocation(l);

		String name = (String) actionBoundary.getActionAttributes().get("name");
		game.setName(name);

		
		String createdByEmail = (String) actionBoundary.getActionAttributes().get("createdBy");
		CreatedBy createdBy = new CreatedBy();
		createdBy.setEmail(createdByEmail);

		game.setCreatedby(createdBy);
		game.setCreatedTimestamp(actionBoundary.getCreatedTimestamp());

		/// create the players list and add the creator
		List<String> players = new ArrayList<String>();
		players.add(user.getEmail());
		game.getElementAttributes().put("players", players);

		Integer currentPlayersCount = (Integer) game.getElementAttributes().get("currentPlayersCount"); 
		currentPlayersCount+=1;
		game.getElementAttributes().put("currentPlayersCount", currentPlayersCount);
		
		
		
		
		ElementBoundary newGame = this.elementServiceWithDB.create(createdByEmail, game);

		this.elementServiceWithDB.addChildrenToElement(createdByEmail, court.getElementId().toString(),
				newGame.getElementId());

		return action;
	}

	@SuppressWarnings("rawtypes")
	private ActionEntity createCourt(UserBoundary user, ElementBoundary element, ActionEntity action,
			ActionBoundary actionBoundary) {

		ElementBoundary court = new ElementBoundary();
		court.setActive(true);
		court.setType("COURT");
		court.setElementAttributes(actionBoundary.getActionAttributes());
		Location l = new Location();
		LinkedHashMap l1 = (LinkedHashMap) actionBoundary.getActionAttributes().get("location");
		Double lat = (Double) l1.get("lat");
		Double lng = (Double) l1.get("lng");
		l.setLat(lat);
		l.setLng(lng);
		court.setLocation(l);

		String name = (String) actionBoundary.getActionAttributes().get("name");
		court.setName(name);

		CreatedBy createdBy = new CreatedBy();
		createdBy.setEmail(actionBoundary.getInvokedBy().getEmail());

		court.setCreatedby(createdBy);
		court.setCreatedTimestamp(actionBoundary.getCreatedTimestamp());

		this.elementServiceWithDB.create(user.getEmail(), court);

		return action;

	}

	@SuppressWarnings({ "unchecked" })
	private ActionEntity joinGame(UserBoundary user, ElementBoundary game, ActionEntity action,
			ActionBoundary actionBoundary) {

		ArrayList<String> players = (ArrayList<String>) game.getElementAttributes().get("players");

		Integer maxPlayers = (Integer) game.getElementAttributes().get("maxPlayers");

		if (players.contains(user.getEmail()))
			throw new ActionNotFoundException("You were already added to the game !");

		if (players.size() == maxPlayers)
			throw new ActionNotFoundException("Game is full!");

		Integer currentPlayersCount = (Integer) game.getElementAttributes().get("currentPlayersCount");
		currentPlayersCount += 1;
		game.getElementAttributes().put("currentPlayersCount", currentPlayersCount);

		players.add(user.getEmail());
		game.getElementAttributes().put("players", players);

		// getParents
		Collection<ElementBoundary> parents = this.elementServiceWithDB.getElementParents(user.getEmail(),
				game.getElementId());

		
		String createdByEmail = (String) actionBoundary.getActionAttributes().get("createdBy");
		
		this.elementServiceWithDB.update(createdByEmail, game.getElementId(), game);

		// add parents
		for (ElementBoundary parent : parents) {
			this.elementServiceWithDB.addChildrenToElement(createdByEmail, parent.getElementId(), game.getElementId());
		}

		return action;

	}
	
	
	
	@SuppressWarnings({ "unchecked" })
	private ActionEntity leaveGame(UserBoundary user, ElementBoundary game, ActionEntity action,
			ActionBoundary actionBoundary) {

		ArrayList<String> players = (ArrayList<String>) game.getElementAttributes().get("players");

		Integer maxPlayers = (Integer) game.getElementAttributes().get("maxPlayers");

		if (players.size() == 0)
			throw new ActionNotFoundException("Game is empty!");
	
		Integer currentPlayersCount = (Integer) game.getElementAttributes().get("currentPlayersCount"); 
		currentPlayersCount-=1;
		currentPlayersCount= Math.max(currentPlayersCount,0);
		game.getElementAttributes().put("currentPlayersCount", currentPlayersCount);
		
		//remove player 
		if (!players.remove(user.getEmail())) {
			throw new ActionNotFoundException("You didn't join this game!");
		}
		game.getElementAttributes().put("players", players);
		
	
		
		String createdByEmail = (String) actionBoundary.getActionAttributes().get("createdBy");
		//getParents
		Collection<ElementBoundary> parents = this.elementServiceWithDB.getElementParents(createdByEmail, game.getElementId());
		
		this.elementServiceWithDB.update(createdByEmail, game.getElementId(), game);

		
		//add parents 
		for  (ElementBoundary parent : parents ) {
			this.elementServiceWithDB.addChildrenToElement(createdByEmail, parent.getElementId(), game.getElementId());
		}
		
		return action;

	}
	
}

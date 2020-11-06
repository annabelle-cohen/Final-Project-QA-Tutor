package acs.logic;


import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;


import acs.boundaries.ActionBoundary;
import acs.data.ActionConverter;
import acs.data.ActionEntity;


//@Service
public class ActionServiceMockup implements ActionService {
	
	private Map<Long, ActionEntity> database;
	private ActionConverter entityConverter;
	private AtomicLong nextElementId;

	@Autowired
	public void setActionConverter(ActionConverter entityConverter) {
		this.entityConverter = entityConverter;

	}

	@PostConstruct
	public void init() {
		this.database = Collections.synchronizedMap(new HashMap<>());
		this.nextElementId = new AtomicLong(0L);
	}

	@Override
	public ActionBoundary invokeAction(ActionBoundary element) {
		
		Long newId = nextElementId.incrementAndGet();
		
		element.setCreatedTimestamp(new Date());
	//	element.setActionId(this.entityConverter.fromEntityId(newId));
		
		ActionEntity entity =
				this.entityConverter
					.toEntity(element);
		
		
		this.database
			.put(newId, entity);
		
		return this.entityConverter
				.convertFromEntity(entity);
	}

	@Override
	public List<ActionBoundary> getAllActions(String email) {
		// TODO - verify admin email
		
		return this.database 
				.values() 
				.stream() 
				.map(entity->this.entityConverter.convertFromEntity(entity))
				.collect(Collectors.toList()); 
	}

	@Override
	public void deleteAllActions(String adminEmail) {
		// TODO - verify admin email
		this.database.clear();

	}

}

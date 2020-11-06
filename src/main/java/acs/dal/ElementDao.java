package acs.dal;

//import org.springframework.data.repository.PagingAndSortingRepository;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import acs.data.ElementEntity;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ElementDao extends MongoRepository<ElementEntity, Long> {


	public List<ElementEntity> findAllByNameLike(@Param("name") String name, Pageable pageable);

	public List<ElementEntity> findAllByTypeLike(@Param("type") String name, Pageable pageable);

	
	public List<ElementEntity> findAllByChildrenElementId(@Param("elementId") Long
			 childrenElementId, Pageable pageable);
			 
	public List<ElementEntity> findAllByParentsElementId(@Param("elementId") Long
			parentElementId, Pageable pageable);
	
	
	public List<ElementEntity> findAllByTypeAndActiveAndLocation_lngBetweenAndLocation_latBetween(
						@Param("type") String type, 
						@Param("isActive") boolean active,
						@Param("minLng") Double minLng,
						@Param("maxLng") Double maxLng,
						@Param("minLat") Double minLat,
						@Param("maxLat") Double maxLat,
						 Pageable pageable);
	
	
/*	not working doesn't recognize elemntId columns
 * public List<ElementEntity> findAllByElementIdGreaterThanEqualAndIdLessThanEqual(@Param("minElementId") Long minId,
			@Param("maxElementId") Long maxId, Pageable pageable);

	public List<ElementEntity> findAllByElementIdBetweenAndImportant(@Param("minElementId") Long minId, 
			@Param("maxElementId") Long maxId, 

			@Param("isImportant") boolean impr, 

			Pageable pageable);
			*/
}

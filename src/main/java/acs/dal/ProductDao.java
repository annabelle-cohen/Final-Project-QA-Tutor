package acs.dal;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import acs.data.entity.CategoryEntity;
import acs.data.entity.ProductEntity;

//https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
public interface ProductDao extends CrudRepository<ProductEntity, Long> {

	@Query("SELECT p FROM ProductEntity p WHERE :category in elements(p.categories)")
	Page<ProductEntity> findAllBycategory( @Param("category") CategoryEntity categroy ,  Pageable pageable);

	
	//@Query("SELECT p FROM ProductEntity p WHERE  p.title LIKE %?1%")
	Page<ProductEntity> findByTitleContainingIgnoreCase( String keyWord  ,  Pageable pageable);
	
	

}
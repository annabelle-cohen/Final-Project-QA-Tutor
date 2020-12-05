package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.CategoryEntity;


public interface CategoryDao extends CrudRepository<CategoryEntity, Long>{



	
}
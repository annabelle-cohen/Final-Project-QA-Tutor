
package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.SearchListEntity;


public interface SearchListDao extends CrudRepository<SearchListEntity, Long>{

}
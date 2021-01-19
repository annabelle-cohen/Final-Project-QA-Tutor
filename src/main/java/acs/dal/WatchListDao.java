package acs.dal;

import org.springframework.data.repository.CrudRepository;


import acs.data.entity.WatchListEntity;

public interface WatchListDao extends CrudRepository<WatchListEntity, Long>{

}
package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.ImageEntity;



public interface  ImageDao extends CrudRepository<ImageEntity, Long>{

}

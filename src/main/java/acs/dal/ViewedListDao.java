package acs.dal;

import org.springframework.data.repository.CrudRepository;
import acs.data.entity.ViewedListEntity;

public interface ViewedListDao extends CrudRepository<ViewedListEntity, Long> {

}
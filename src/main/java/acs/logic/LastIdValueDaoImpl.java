package acs.logic;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import org.springframework.stereotype.Repository;

import acs.dal.LastValue;
import acs.dal.LastValueDao;



@Repository
public class LastIdValueDaoImpl implements LastValueDao {

	@Autowired
	private MongoOperations mongoOperation;

	@Override
	public long getNextSequenceId(String key) throws LastValueException {

	  //get sequence id
	  Query query = new Query(Criteria.where("_id").is(key));

	  //increase sequence id by 1
	  Update update = new Update();
	  update.inc("lastValue", 1);

	  //return new increased id
	  FindAndModifyOptions options = new FindAndModifyOptions();
	  options.returnNew(true);

	  //this is the magic happened.
	  LastValue seqId =
            mongoOperation.findAndModify(query, update, options, LastValue.class);

	  //if no id, create the document 
        
	  if (seqId == null) {
		  LastValue seq = new LastValue ();
		  seq.setId(key);
		  seq.setLastValue(0L);
		  mongoOperation.save(seq);
		  seqId= seq;
	  }

	  return seqId.getLastValue();

	}

}
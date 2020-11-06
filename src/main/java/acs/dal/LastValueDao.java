package acs.dal;



import acs.logic.LastValueException;
public interface LastValueDao {
	long getNextSequenceId(String key) throws LastValueException;
}

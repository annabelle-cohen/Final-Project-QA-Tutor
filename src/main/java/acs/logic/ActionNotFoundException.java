package acs.logic;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ActionNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = -1192893341384265272L;

	public ActionNotFoundException() {
		super();
	}

	
	public ActionNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public ActionNotFoundException(String message) {
		super(message);
	}

	public ActionNotFoundException(Throwable cause) {
		super(cause);
	}

}


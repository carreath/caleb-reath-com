package app.repositories.authentication;

import app.models.authentication.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

/**
 * Created by carre on 2017-08-10.
 */
public interface UserRepository extends JpaRepository<User, Long> { }

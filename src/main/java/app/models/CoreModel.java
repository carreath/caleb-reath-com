package app.models;

import org.hibernate.annotations.Immutable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by carre on 2017-08-31.
 */
@Entity
public abstract class CoreModel {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }
}

import React, {useState, useEffect} from 'react'
import styles from './style.module.scss'
import { useForm } from 'react-hook-form';
import group from '../../assets/i.svg'

const NewTask = () => {

  const { register, watch } = useForm({
    defaultValues: {
      gravityValue: 10,
      isPlanetChecked: false
    }
  }); 
  const [bodies, setBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState(null);

  const isPlanetChecked = watch('isPlanetChecked');
  const gravityValue = watch('gravityValue');


  useEffect(() => {
      const fetchBodies = async () => {  
          const res = await fetch(`https://api.le-systeme-solaire.net/rest.php/bodies?filter[]=isPlanet,eq,${isPlanetChecked}&filter[]=gravity,lt,${gravityValue}`);
          const data = await res.json();
          setBodies(data.bodies);
      }
  
      fetchBodies();
    }, [isPlanetChecked,gravityValue]);



  const onSelectBody = (event) => {
    // Find and set the selected body based on the event.target.value
    const body = bodies.find(b => b.id === event.target.value);
    setSelectedBody(body);
  };

  return (
    <form className={styles.wrapper}>
      <div className={styles.newTask}>
                <div className={styles.group}>
                  <label>Is Planet</label>
                  <input type="checkbox" {...register('isPlanetChecked')} className={styles.checkbox}/>
                </div>

                <div className={styles.group}>
                  <label>Gravity &#40; &#60; {gravityValue} &#41;</label>
                  <input type="range" {...register('gravityValue')} min="0" step={0.01} max="25" defaultValue="10" className={styles.select}/>
                </div>

          <div className={styles.group}>
                <label>Bodies</label>
                <select onChange={onSelectBody} className={styles.select}>
                    {bodies.map(body => <option key={body.id} value={body.id} className={styles.option}>{body.name}</option>)}
                </select>
            </div>

            <div className={styles.info}>
                <h3>Info on the body :</h3>
                {selectedBody ? (
                <div>
                    <p>id: {selectedBody.id}</p>
                    <p>Name: {selectedBody.name}</p>
                    <p>Gravity: {selectedBody.gravity}</p>
                    <p>Escape: {selectedBody.escape}</p>
                    <p>Mean Radius: {selectedBody.meanRadius}</p>
                    <p>Equatorial Radius: {selectedBody.equaRadius}</p>
                    <p>Polar Radius: {selectedBody.polarRadius}</p>
                    <p>Flattening: {selectedBody.flattening}</p>
                    <p>Sideral Orbit: {selectedBody.sideralOrbit}</p>
                    <p>Sideral Rotation: {selectedBody.sideralRotation}</p>
                    <p>English Name: {selectedBody.englishName}</p>
                    <p>Is Planet: {selectedBody.isPlanet ? 'true' : 'false'}</p>
                </div>
                ) : <p className={styles.nodata}>
                      <img src={group} alt="Group 1" className={styles.SecondImg} />
                      No body selected
                  </p>} 
            </div>


      </div>

      <p className={styles.NewTaskTitle}>Rhobs</p>
    </form>

  )
}

export default NewTask
from flask import Flask, render_template, redirect, url_for, request, session
from flask_mysqldb import MySQL, MySQLdb

app = Flask(__name__,template_folder='Templates')

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='chululu'
app.config['MYSQL_DB']='login'
app.config['MYSQL_CURSORCLASS']='DictCursor'
mysql=MySQL(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    if 'logueado' in session and session['logueado'] is True:
        return redirect(url_for('mostrar_perfil'))
    else:
        return render_template('login.html')
    

@app.route('/register')
def register():
    if 'logueado' in session and session['logueado'] is True:
        return redirect(url_for('mostrar_perfil')) 
    else:
        return render_template('register.html')

@app.route('/tarea')
def nueva_tarea():
    return render_template('tarea.html')

@app.route('/calendar')
def calendar():
    if 'logueado' in session and session['logueado'] is True:
        
        id_usuario = session['id_usuario']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM tareas WHERE id_usuario = %s", [id_usuario])   
        tareas = cur.fetchall()
        cur.close()
        
        return render_template('calendar.html', tareas=tareas)
    else:
        return redirect(url_for('login'))
    
@app.route('/contacto')
def contacto():
    return render_template('contact.html')

@app.route('/perfil')
def mostrar_perfil():
    if 'nombre' in session and 'apellido' in session:
        _gmail = session.get('gmail', '')
        _nombre = session.get('nombre', '')
        _apellido = session.get('apellido', '')
        
        _nombreCompleto = _nombre + " " + _apellido
        
        return render_template('perfil.html', nombreCompleto=_nombreCompleto, nombre=_nombre, apellido=_apellido, gmail=_gmail)
    else:
        return redirect(url_for('login'))
    

@app.route('/crear_tarea', methods=['GET', 'POST'])
def crear_tarea():
    if request.method == 'POST':
        nombre = request.form['nombre']
        dia = int(request.form['dia'])
        mes = int(request.form['mes'])
        anio = int(request.form['anio'])
        descripcion = request.form['descripcion']
        empieza = request.form['empieza']
        termina = request.form['termina']
        id_usuario = session['id_usuario']
        
        if nombre and dia and mes and anio and descripcion and empieza and termina:
            cursor = mysql.connection.cursor()
            query = """
                    INSERT INTO tareas (id_usuario, nombre, dia, mes, anio, descripcion, empieza, termina)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """
            cursor.execute(query, (id_usuario, nombre, dia, mes, anio, descripcion, empieza, termina))
            mysql.connection.commit()
            cursor.close()
            return redirect(url_for('mis_tareas')) 
        
    return render_template('tarea.html')    

@app.route('/MisTareas', methods=["GET"])
def mis_tareas():
    id_usuario = session['id_usuario']
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tareas WHERE id_usuario = %s", [id_usuario])   
    tareas = cur.fetchall()
    cur.close()
    
    return render_template('MisTareas.html', tareas=tareas)


@app.route("/eliminar_tarea", methods=["POST"])
def eliminarTarea():
    cur = mysql.connection.cursor()
    id_tarea = request.form['id']
    cur.execute("DELETE FROM tareas WHERE id_tarea = %s", (id_tarea,))    
    mysql.connection.commit()
    cur.close()
    return redirect(url_for('mis_tareas'))
    


@app.route('/crear_registro', methods=["GET","POST"])
def crear_registro():
    _nombre = request.form['nombre']
    _apellido = request.form['apellido']
    _gmail = request.form['gmail']
    _password = request.form['password']
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id_usuario FROM usuarios WHERE gmail = %s", (_gmail,))
    user = cur.fetchone()
    
    if user:
        return render_template('register.html', mensaje3="ya tienes una cuenta con este correo")
    else:
        cur.execute(" INSERT INTO usuarios (nombre, apellido, gmail, contraseña) VALUES (%s, %s, %s, %s)", (_nombre, _apellido, _gmail, _password))
        mysql.connection.commit()
        return render_template('login.html', mensaje2="usuario registrado exitosamente!")
    


@app.route('/acceso_login', methods=["GET","POST"])
def acceso_login():
    
    if request.method == 'POST' and 'gmail' in request.form and 'password' in request.form:
        _gmail = request.form['gmail']
        _password = request.form['password']
        
        cur=mysql.connection.cursor()
        cur.execute('SELECT * FROM usuarios WHERE gmail = %s AND contraseña = %s', (_gmail, _password,))
        account = cur.fetchone()
        
        if account:
            session['logueado'] = True
            session['id_usuario'] = account['id_usuario']
            session['gmail'] = account['gmail']
            session['nombre'] = account['nombre']
            session['apellido'] = account['apellido']
            
            cur.close()
            return redirect(url_for('calendar'))
        else:
            return render_template('login.html', mensaje="usuario incorrecto")
        
@app.route('/logout')
def logout():
    session.clear()
    session['logueado'] = False
    return redirect(url_for('login'))      

if __name__ == '__main__':
    app.secret_key="chululu"
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)

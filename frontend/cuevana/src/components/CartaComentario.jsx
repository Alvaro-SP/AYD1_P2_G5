
export default function CartaComentario(props) {
    return (<>
        <li>
            <div className="comment-main-level">
                <div className="comment-avatar"><img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" /></div>

                <div className="comment-box">
                    <div className="comment-head">
                        <h6 className="comment-name">{props.nombre}</h6>
                    </div>
                    <div className="comment-content">
                        {props.texto}
                    </div>
                </div>
            </div>
        </li>
    </>)
}
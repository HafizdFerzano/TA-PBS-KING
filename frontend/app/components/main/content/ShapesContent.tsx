import { useEffect, useState } from "react";
import { ShapeCardTest } from "../../ui/ShapeCard";
import axios from "axios";

type Shape = {
  id: number;
  shape: string;
  title: string;
  color: string;
  formulaArea: string;
  formulaPerimeter: string;
  content: string;
  audio: string;
};

function ShapesContent() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const fetchShapes = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/bangun-datar`);
      setShapes(res.data.data);
    } catch (error: unknown) {
      console.error("Gagal ambil data shapes:", error);
    }
  };

  useEffect(() => {
    fetchShapes();

    (window as any).playAudio = (shape: string) => {
      const audio = document.getElementById(
        `${shape}Audio`
      ) as HTMLAudioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }

      const messages: Record<string, string> = {
        square: "Square: 4 equal sides, 4 right angles!",
        triangle: "Triangle: 3 sides, 3 angles!",
        circle: "Circle: Round and smooth, no corners!",
        rectangle: "Rectangle: 4 sides, opposite sides equal!",
      };
    };
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">📚 Meet the Shapes!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {shapes.map((s, i) => (
          <div key={s.id}>
            <ShapeCardTest
              shape={s.shape}
              title={s.title}
              color={s.color}
              formulaArea={s.formulaArea}
              formulaPerimeter={s.formulaPerimeter}
              content={s.content}
            />
            <audio id={`${s.shape}Audio`} src={s.audio}></audio>
          </div>
        ))}
      </div>

      {/* </div> */}
    </section>
  );
}

export default ShapesContent;

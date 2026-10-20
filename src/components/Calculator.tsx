import { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [elsoSzam, setElsoSzam] = useState("");
  const [muvelet, setMuvelet] = useState("");
  const [ujSzam, setUjSzam] = useState(false);

  function szamjegy(szam: string) {
    if (ujSzam || display === "Hiba") {
      setDisplay(szam);
      setUjSzam(false);
    } else if (display === "0") {
      setDisplay(szam);
    } else {
      setDisplay(display + szam);
    }
  }

  function tizedes() {
    if (ujSzam || display === "Hiba" || display === "") {
      setDisplay("0.");
      setUjSzam(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function muveletValasztas(jel: string) {
    if (display === "Hiba") {
      return;
    }

    if (muvelet !== "") {
      setMuvelet(jel);
      return;
    }

    setElsoSzam(display);
    setMuvelet(jel);
    setDisplay("");
    setUjSzam(false);
  }

  function egyenlo() {
    if (elsoSzam === "" || display === "" || muvelet === "") {
      return;
    }

    const a = Number(elsoSzam);
    const b = Number(display);
    let eredmeny = 0;

    if (muvelet === "+") {
      eredmeny = a + b;
    } else if (muvelet === "-") {
      eredmeny = a - b;
    } else if (muvelet === "×") {
      eredmeny = a * b;
    } else if (muvelet === "÷") {
      eredmeny = a / b;
    }

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(eredmeny) ||
      (muvelet === "÷" && b === 0)
    ) {
      setDisplay("Hiba");
    } else {
      setDisplay(String(eredmeny));
    }

    setElsoSzam("");
    setMuvelet("");
    setUjSzam(true);
  }

  function torles() {
    setDisplay("0");
    setElsoSzam("");
    setMuvelet("");
    setUjSzam(false);
  }

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">
      <div
        className="card border-0 shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="h4 text-center mb-4">Számológép</h1>

        <div
          className="bg-dark text-white text-end p-3 rounded mb-3"
          style={{
            fontSize: "2rem",
            minHeight: "90px",
            overflowWrap: "anywhere",
          }}
          aria-live="polite"
        >
          {elsoSzam} {muvelet} {display}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {["7", "8", "9"].map((szam) => (
            <button
              key={szam}
              className="btn btn-outline-dark btn-lg"
              onClick={() => szamjegy(szam)}
            >
              {szam}
            </button>
          ))}

          <button
            className="btn btn-warning btn-lg"
            onClick={() => muveletValasztas("÷")}
          >
            ÷
          </button>

          {["4", "5", "6"].map((szam) => (
            <button
              key={szam}
              className="btn btn-outline-dark btn-lg"
              onClick={() => szamjegy(szam)}
            >
              {szam}
            </button>
          ))}

          <button
            className="btn btn-warning btn-lg"
            onClick={() => muveletValasztas("×")}
          >
            ×
          </button>

          {["1", "2", "3"].map((szam) => (
            <button
              key={szam}
              className="btn btn-outline-dark btn-lg"
              onClick={() => szamjegy(szam)}
            >
              {szam}
            </button>
          ))}

          <button
            className="btn btn-warning btn-lg"
            onClick={() => muveletValasztas("-")}
          >
            −
          </button>

          <button
            className="btn btn-outline-dark btn-lg"
            onClick={() => szamjegy("0")}
          >
            0
          </button>

          <button
            className="btn btn-outline-dark btn-lg"
            onClick={tizedes}
          >
            .
          </button>

          <button className="btn btn-danger btn-lg" onClick={torles}>
            C
          </button>

          <button
            className="btn btn-warning btn-lg"
            onClick={() => muveletValasztas("+")}
          >
            +
          </button>

          <button
            className="btn btn-success btn-lg"
            style={{ gridColumn: "1 / -1" }}
            onClick={egyenlo}
          >
            =
          </button>
        </div>

        {display === "Hiba" && (
          <p className="text-danger text-center mt-3 mb-0" role="alert">
            Hibás számítás vagy nullával való osztás!
          </p>
        )}
      </div>
    </main>
  );
}

export default Calculator;
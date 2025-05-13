using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class UIManager : MonoBehaviour
{
    // Paneles principales del flujo de juego
    public GameObject panelLogin;
    public GameObject panelEmparejamiento;
    public GameObject panelJuego;
    public GameObject panelResultados;

    // UI de carrera
    public GameObject pauseMenu;
    public GameObject gameOverMenu;
    public TextMeshProUGUI lapText;
    public TextMeshProUGUI timeText;
    private bool isPaused = false;

    void Start()
    {
        // Al iniciar, solo el login está activo
        if (panelLogin) panelLogin.SetActive(true);
        if (panelEmparejamiento) panelEmparejamiento.SetActive(false);
        if (panelJuego) panelJuego.SetActive(false);
        if (panelResultados) panelResultados.SetActive(false);
    }

    private void OnEnable()
    {
        GameManager.OnLapChange += UpdateLapUI;
        GameManager.OnRaceEnd += ShowGameOver;
    }

    private void OnDisable()
    {
        GameManager.OnLapChange -= UpdateLapUI;
        GameManager.OnRaceEnd -= ShowGameOver;
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            TogglePause();
        }

        if (!isPaused && timeText)
        {
            float time = GameManager.Instance.CurrentRaceTime;
            timeText.text = "Tiempo: " + time.ToString("F2") + "s";
        }
    }

    private void UpdateLapUI(int currentLap)
    {
        if (lapText)
            lapText.text = "Vuelta: " + currentLap + "/" + GameManager.Instance.TotalLaps;
    }

    private void ShowGameOver()
    {
        if (gameOverMenu)
            gameOverMenu.SetActive(true);
    }

    public void TogglePause()
    {
        isPaused = !isPaused;
        if (pauseMenu)
            pauseMenu.SetActive(isPaused);
        Time.timeScale = isPaused ? 0 : 1;
    }

    public void ResumeGame()
    {
        isPaused = false;
        if (pauseMenu)
            pauseMenu.SetActive(false);
        Time.timeScale = 1;
    }

    public void QuitGame()
    {
        Application.Quit();
    }

    // --- Métodos para controlar el flujo de paneles ---

    // Llamar cuando el login es correcto
    public void OnLoginSuccess()
    {
        if (panelLogin) panelLogin.SetActive(false);
        if (panelEmparejamiento) panelEmparejamiento.SetActive(true);
    }

    // Llamar cuando el emparejamiento está listo
    public void OnEmparejamientoListo()
    {
        if (panelEmparejamiento) panelEmparejamiento.SetActive(false);
        if (panelJuego) panelJuego.SetActive(true);
    }

    // Llamar cuando termina la carrera
    public void OnCarreraTerminada()
    {
        if (panelJuego) panelJuego.SetActive(false);
        if (panelResultados) panelResultados.SetActive(true);
    }
} 